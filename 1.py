names = ["Ali", "Sara", "Reza"]

name = input("نام خود را وارد کنید: ")

if name in names:
    print("این اسم قبلاً در لیست وجود دارد")
else:
    names.append(name)
    print("اسم با موفقیت اضافه شد")

print(names)