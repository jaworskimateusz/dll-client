#pragma once
#include <string>
#include <iostream>
#include <fstream>
typedef long long long64;


#ifdef MYLIBRARY_EXPORTS
#define MYLIBRARY_API __declspec(dllexport)
#else
#define MYLIBRARY_API __declspec(dllimport)
#endif

extern "C" MYLIBRARY_API int Sum(int a, int b);

extern "C" MYLIBRARY_API int Diff(int a, int b);

extern "C" MYLIBRARY_API int Multiply(int a, int b);

extern "C" MYLIBRARY_API int CreateNewFile(LPCWSTR fileName, LPCWSTR content);
