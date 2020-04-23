#include "pch.h" // use stdafx.h in Visual Studio 2017 and earlier
#include "MyLibrary.h"

int Sum(int a, int b)
{
    return a + b;
}

int Diff(int a, int b)
{
    return a - b;
}

int Multiply(int a, int b)
{
    return a * b;
}

int CreateNewFile(LPCWSTR fileName, LPCWSTR content)
{
    std::ofstream file(fileName);
    long64 size = wcslen(content);
    char* cString = new char[size];
    for (long64 i = 0; i < size; i++)
    {
        cString[i] = content[i];
    }
    std::string String(cString);
    file << String;

    return 1;
    //std::wstring stemp = std::wstring(s.begin(), s.end());
    //LPCWSTR sw = stemp.c_str();
}

