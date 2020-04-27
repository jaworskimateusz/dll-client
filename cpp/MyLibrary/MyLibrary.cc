#include "pch.h" 
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
}

void OpenCamera()
{
    char filename[] = "./samples/scripts/open-camera.py";
    FILE* fp;
    Py_Initialize();
    fp = _Py_fopen(filename, "r");
    PyRun_SimpleFile(fp, filename);
    Py_Finalize();
}


