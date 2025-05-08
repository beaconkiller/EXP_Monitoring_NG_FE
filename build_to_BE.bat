set src=%cd%
@REM set be_folder="TF_Scoring_Dashb_Node"
set be_folder="TF_EAppr_Node_BE"

for /f "tokens=2 delims==" %%I in ('"wmic os get localdatetime /value"') do set datetime=%%I
set date=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2%


@REM @REM ------------------------- GIT PUSH ON FLUTTER -------------------------

@REM cd /d "%src%"
@REM git switch dev_branch_0.1 && ^
@REM git add . && ^
@REM git status && ^
@REM git commit -m "DEPLOY SEQUENCE - %date%" && ^
@REM git push origin dev_branch_0.1 && ^

@REM ------------------------- GIT PUSH ON NODE BE -------------------------

ng build && ^
xcopy "%src%\dist\tf-e-approval\browser" "%src%\..\%be_folder%\web" /E /I /H /C /Y && ^
cd /d "%src%\..\%be_folder%\" && ^
git switch dev_branch_v0.2 && ^
git add . && ^
git status && ^
git commit -m "DEPLOY SEQUENCE - %date%" && ^
git push origin dev_branch_v0.2