echo update submodule...
git submodule foreach git restore .
git submodule update --remote

echo copy source to root folder...
xcopy "..\.root" "..\..\..\" /E /Y

echo copy source to src folder...
xcopy "..\.src" "..\..\" /E /Y

echo node package manager install...
npm install

