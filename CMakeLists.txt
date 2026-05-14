cmake_minimum_required(VERSION 3.10)
project(CryptoDashboard)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find cURL
find_package(CURL REQUIRED)

# nlohmann_json might be available via find_package, or header-only
# If installed via vcpkg, it should be found
find_package(nlohmann_json CONFIG REQUIRED)

add_executable(CryptoDashboard CryptoDashboard.cpp)

# Link libraries
target_link_libraries(CryptoDashboard PRIVATE ${CURL_LIBRARIES} nlohmann_json::nlohmann_json)
target_include_directories(CryptoDashboard PRIVATE ${CURL_INCLUDE_DIRS})
