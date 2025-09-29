set src=%cd%
@REM set be_folder="TF_Scoring_Dashb_Node"
set be_folder="EXP_Monitoring_BE"

for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set date=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%


@REM ------------------------- GIT PUSH ON ANGULAR FE -------------------------

cd /d "%src%"
git switch master && ^
git add . && ^
git status && ^
git commit -m "DEPLOY SEQUENCE - %date%" && ^
git push origin master && ^

@REM ------------------------- GIT PUSH ON NODE BE -------------------------

ng build && ^
xcopy "%src%\dist\exp-monitoring\browser" "%src%\..\%be_folder%\web" /E /I /H /C /Y && ^
cd /d "%src%\..\%be_folder%\" && ^
git switch master && ^
git add . && ^
git status && ^
git commit -m "DEPLOY SEQUENCE - %date%" && ^
git push origin master