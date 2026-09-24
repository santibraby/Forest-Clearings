@echo off
setlocal
cd /d "%~dp0"
echo.
echo   FOREST SPOTS - push to GitHub
echo   -----------------------------
echo.
git status --short
echo.
set "MSG=%~1"
if "%MSG%"=="" set "MSG=Update %date% %time:~0,5%"
git add -A
git commit -m "%MSG%"
if errorlevel 1 echo   (nothing new to commit - pushing anyway)
echo.
git push origin main
echo.
if errorlevel 1 (
  echo   Push failed - see the message above.
  echo   First time: a GitHub sign-in window opens - sign in, then run this again.
) else (
  echo   Done. The live app updates in about a minute:
  echo   https://santibraby.github.io/Forest-Clearings/
)
echo.
pause
