#include <iostream>
#include <string>
#include <vector>
#include <chrono>
#include <thread>
#include <cmath>
#include <algorithm>
#include <iomanip>
#include <curl/curl.h>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

// ANSI escape codes for terminal colors
namespace Color {
    const std::string RESET = "\033[0m";
    const std::string RED = "\033[31m";
    const std::string GREEN = "\033[32m";
    const std::string YELLOW = "\033[33m";
    const std::string BLUE = "\033[34m";
    const std::string CYAN = "\033[36m";
    const std::string BOLD = "\033[1m";
}

// ---------------------------------------------------------
// HTTP Client Wrapper
// ---------------------------------------------------------
class HttpClient {
public:
    HttpClient() {
        curl_global_init(CURL_GLOBAL_DEFAULT);
    }
    
    ~HttpClient() {
        curl_global_cleanup();
    }

    std::string get(const std::string& url) {
        CURL* curl = curl_easy_init();
        std::string readBuffer;
        
        if (curl) {
            curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
            curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
            curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);
            
            // Set User-Agent to comply with API requirements
            struct curl_slist* headers = nullptr;
            headers = curl_slist_append(headers, "User-Agent: ProfessionalCryptoDashboard/1.0");
            headers = curl_slist_append(headers, "Accept: application/json");
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
            
            // Set timeout
            curl_easy_setopt(curl, CURLOPT_TIMEOUT, 10L);
            
            CURLcode res = curl_easy_perform(curl);
            if (res != CURLE_OK) {
                std::cerr << Color::RED << "cURL Error: " << curl_easy_strerror(res) << Color::RESET << "\n";
            }
            
            curl_slist_free_all(headers);
            curl_easy_cleanup(curl);
        }
        return readBuffer;
    }

private:
    static size_t WriteCallback(void* contents, size_t size, size_t nmemb, std::string* userp) {
        size_t totalSize = size * nmemb;
        userp->append((char*)contents, totalSize);
        return totalSize;
    }
};

// ---------------------------------------------------------
// Crypto API Service
// ---------------------------------------------------------
class CryptoAPI {
private:
    HttpClient httpClient;
    const std::string BASE_URL = "https://api.coingecko.com/api/v3";

public:
    json fetchLivePrices(const std::vector<std::string>& coins) {
        std::string ids = "";
        for (size_t i = 0; i < coins.size(); ++i) {
            ids += coins[i];
            if (i < coins.size() - 1) ids += ",";
        }
        
        std::string url = BASE_URL + "/simple/price?ids=" + ids + "&vs_currencies=usd&include_24hr_change=true";
        std::string response = httpClient.get(url);
        
        if (response.empty()) {
            return json();
        }
        
        try {
            return json::parse(response);
        } catch (const json::parse_error& e) {
            std::cerr << Color::RED << "JSON Parse Error: " << e.what() << Color::RESET << "\n";
            return json();
        }
    }

    std::vector<double> fetchHistoricalPrices(const std::string& coin, int days = 7) {
        std::string url = BASE_URL + "/coins/" + coin + "/market_chart?vs_currency=usd&days=" + std::to_string(days) + "&interval=daily";
        std::string response = httpClient.get(url);
        std::vector<double> prices;
        
        if (response.empty()) return prices;
        
        try {
            auto data = json::parse(response);
            if (data.contains("prices")) {
                for (const auto& item : data["prices"]) {
                    if (item.size() >= 2) {
                        prices.push_back(item[1].get<double>());
                    }
                }
            }
        } catch (const json::parse_error& e) {
            std::cerr << Color::RED << "JSON Parse Error: " << e.what() << Color::RESET << "\n";
        }
        return prices;
    }
};

// ---------------------------------------------------------
// UI and Dashboard Coordinator
// ---------------------------------------------------------
class Dashboard {
private:
    CryptoAPI api;
    std::vector<std::string> trackedCoins = {"bitcoin", "ethereum", "ripple", "solana", "cardano"};

    void clearScreen() {
        // Platform independent clear screen
        #if defined(_WIN32)
            system("cls");
        #else
            system("clear");
        #endif
    }

    void drawChart(const std::vector<double>& prices, const std::string& coinName, int days) {
        if (prices.empty()) {
            std::cout << Color::RED << "No data available to plot chart.\n" << Color::RESET;
            return;
        }

        auto [min_it, max_it] = std::minmax_element(prices.begin(), prices.end());
        double min_val = *min_it;
        double max_val = *max_it;
        double range = max_val - min_val;
        if (range == 0) range = 1; // Prevent division by zero

        int height = 12;
        std::cout << "\n" << Color::CYAN << Color::BOLD 
                  << "--- " << coinName << " " << days << "-Day Historical Price Trend ---\n" 
                  << Color::RESET;
        
        for (int y = height; y >= 0; --y) {
            double current_level = min_val + (range * y / height);
            std::cout << std::fixed << std::setprecision(2) << std::setw(10) << current_level << " | ";
            
            for (double price : prices) {
                int target_y = std::round((price - min_val) / range * height);
                if (target_y == y) {
                    std::cout << Color::YELLOW << "* " << Color::RESET;
                } else {
                    std::cout << "  ";
                }
            }
            std::cout << "\n";
        }
        std::cout << "           " << std::string(prices.size() * 2, '-') << "\n";
        std::cout << "           Time (Oldest -> Newest)\n";
    }

public:
    void run() {
        int choice = 0;
        while (choice != 3) {
            clearScreen();
            std::cout << Color::BLUE << Color::BOLD << "\n=========================================\n";
            std::cout << "        PROFESSIONAL CRYPTO DASHBOARD    \n";
            std::cout << "=========================================\n" << Color::RESET;
            std::cout << "1. View Live Prices\n";
            std::cout << "2. View Bitcoin Trend Chart\n";
            std::cout << "3. Exit\n";
            std::cout << "-----------------------------------------\n";
            std::cout << "Enter selection: ";
            
            if (!(std::cin >> choice)) {
                std::cin.clear();
                std::cin.ignore(10000, '\n');
                continue;
            }
            
            switch (choice) {
                case 1: {
                    std::cout << "\nFetching live data...\n";
                    json data = api.fetchLivePrices(trackedCoins);
                    
                    std::cout << Color::CYAN << "\n         LIVE CRYPTO PRICES (USD)       \n";
                    std::cout << "-----------------------------------------\n" << Color::RESET;
                    
                    if (!data.empty() && data.is_object()) {
                        for (const auto& coin : trackedCoins) {
                            if (data.contains(coin)) {
                                double price = data[coin].value("usd", 0.0);
                                double change = data[coin].value("usd_24h_change", 0.0);
                                
                                std::cout << std::left << std::setw(12) << coin << ": $" 
                                          << std::right << std::setw(10) << std::fixed << std::setprecision(2) << price;
                                
                                std::string changeStr = " (" + (change >= 0 ? std::string("+") : "") + std::to_string(change) + "% 24h)";
                                if (change >= 0) {
                                    std::cout << Color::GREEN << changeStr << Color::RESET << "\n";
                                } else {
                                    std::cout << Color::RED << changeStr << Color::RESET << "\n";
                                }
                            }
                        }
                    } else {
                        std::cout << Color::RED << "Error retrieving or parsing live prices.\n" << Color::RESET;
                    }
                    std::cout << "\nPress Enter to continue...";
                    std::cin.ignore();
                    std::cin.get();
                    break;
                }
                case 2: {
                    std::cout << "\nFetching historical data...\n";
                    std::vector<double> prices = api.fetchHistoricalPrices("bitcoin", 7);
                    drawChart(prices, "Bitcoin", 7);
                    
                    std::cout << "\nPress Enter to continue...";
                    std::cin.ignore();
                    std::cin.get();
                    break;
                }
                case 3:
                    std::cout << Color::GREEN << "Exiting professional dashboard...\n" << Color::RESET;
                    break;
                default:
                    std::cout << Color::RED << "Invalid choice. Try again.\n" << Color::RESET;
                    std::this_thread::sleep_for(std::chrono::seconds(1));
            }
        }
    }
};

int main() {
    Dashboard dashboard;
    dashboard.run();
    return 0;
}
