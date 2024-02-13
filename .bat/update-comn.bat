echo update submodule...
cd ../../../
git submodule foreach git restore .
git submodule update --remote --force

echo copy source to root folder...
xcopy "src\comn\.root" ".\" /E /Y
xcopy "src\comn\.src" ".\src" /E /Y

echo node package install...
npm install

