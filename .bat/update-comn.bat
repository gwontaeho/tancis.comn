echo update submodule...
cd ../../../
git submodule foreach git restore .
git submodule update --remote

echo copy source to root folder...
xcopy "src\comn\.root" ".\" /E /Y

echo copy source to src folder...
xcopy "src\comn\.src" ".\src" /E /Y

echo node package install...
npm install

