(function (Scratch) {
    const Color = Scratch.Color;
    const Component = Scratch.gui.Component;
    const defineMessages = Scratch.defineMessages;

    const PALETTE_KEY = 'PixelGalleryPalette';

    /* eslint-disable max-len */
    const penIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+YnJ1c2g8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPgogICAgICAgIDxnIGlkPSJicnVzaCIgc3Ryb2tlPSIjNTc1RTc1IiBzdHJva2Utd2lkdGg9IjAuNSIgZmlsbD0iIzU3NUU3NSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMi41Nzg3MjI1LDExLjIxMDIwMjYgQzExLjYxOTYyODQsMTIuMTY5Mjk2NyAxMC45MTI5Mjc0LDEyLjY2MTQ2MzQgMTAuMzU3NjYyNCwxMi44NTA3NTgzIEMxMC4xOTM2MDY5LDEyLjM0NTk3MTkgOS45MTU5NzQzNywxMS44NzkwNDQ1IDkuNTI0NzY0OTQsMTEuNDg3ODM1MSBDOS4xMjA5MzU4NSwxMS4wOTY2MjU3IDguNjU0MDA4NDYsMTAuODE4OTkzMiA4LjE0OTIyMjA5LDEwLjY0MjMxNzkgQzguMzUxMTM2NjQsMTAuMDg3MDUyOSA4Ljg0MzMwMzM1LDkuMzgwMzUyMDMgOS43ODk3Nzc3OCw4LjQzMzg3NzU5IEMxMi4wNjEzMTY0LDYuMTQ5NzE5MjkgMTYuMDk5NjA3NCwzLjM2MDc3NDYxIDE2Ljg2OTQwNjYsNC4xMzA1NzM4MiBDMTcuNjM5MjA1OCw0LjkwMDM3MzAzIDE0Ljg1MDI2MTEsOC45Mzg2NjM5NiAxMi41Nzg3MjI1LDExLjIxMDIwMjYgWiBNOC4zOTEyNDMzNCwxNS40MTIwMTA0IEM4LjAxNTY5MTk3LDE1Ljc3NDg2NTcgNy41MzExMDk1NSwxNS45NjIxNDU5IDcuMDQ2NTI3MTMsMTUuOTg1NTU1OSBMNy4wNDY1MjcxMywxNS45OTcyNjA5IEw2LjkyNTM4MTUzLDE1Ljk5NzI2MDkgQzMuNjc4Njc5MzQsMTYuMTE0MzExIDIuMjYxMjc1NzcsMTIuNDM4OTM3OSAzLjM3NTgxNTMzLDEyLjgyNTIwMzIgQzQuODQxNjc3MTQsMTMuMzI4NTE4NiA1LjQzNjUwMjA1LDEyLjYwMjgwOCA1LjQ1OTUxOTcyLDEyLjU3OTM5OCBDNi4yNzExOTUyNywxMS44MDY4NjczIDcuNTc5NTY3NzksMTEuODA2ODY3MyA4LjM5MTI0MzM0LDEyLjU3OTM5OCBDOS4yMDI5MTg4OSwxMy4zNjM2MzM3IDkuMjAyOTE4ODksMTQuNjM5NDc5OCA4LjM5MTI0MzM0LDE1LjQxMjAxMDQgWiIgaWQ9ImJ1cnNoLWljb24iPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==';
    const fillIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0OC4xICg0NzI1MCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZmlsbDwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJQYWdlLTEiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJmaWxsIiBmaWxsPSIjNTc1RTc1Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTE0LjA0NTA5NjksOS42OTM0OTUwNCBMMTQuMDMwNjgxOCw5LjY3OTE2MjA3IEMxMy40Mzk2NjI5LDkuMzYzODM2ODIgMTIuNTE3MDk2OCw4LjY5MDE4NzQzIDExLjQyMTU0OTYsNy42MDA4ODIwMyBDMTEuMDkwMDAyNCw3LjI3MTIyMzgxIDEwLjc4NzI4NTQsNi45NTU4OTg1NyAxMC41NDIyMjg4LDYuNjU0OTA2MjggQzEwLjcxNTIxLDYuNDM5OTExOCAxMC44ODgxOTExLDYuMjI0OTE3MzEgMTEuMDYxMTcyMiw2LjAwOTkyMjgyIEMxMS4zNzgzMDQzLDYuMjY3OTE2MjEgMTEuNzI0MjY2Niw2LjU4MzI0MTQ2IDEyLjA4NDY0NCw2Ljk0MTU2NTYgQzEyLjMxNTI4NTUsNy4xNzA4OTMwNSAxMi41MDI2ODE3LDcuMzcxNTU0NTggMTIuNjkwMDc4LDcuNTcyMjE2MSBDMTIuNzE4OTA4MSw3LjYxNTIxNDk5IDEyLjc2MjE1MzQsNy42NTgyMTM4OSAxMi44MTk4MTM4LDcuNzAxMjEyNzkgQzEzLjYyNzA1OTEsOC42MTg1MjI2IDE0LjEwMjc1NzMsOS4zNjM4MzY4MiAxNC4zMTg5ODM3LDkuNzkzODI1OCBDMTQuMzE4OTgzNyw5LjgwODE1ODc3IDE0LjMzMzM5ODgsOS44MjI0OTE3MyAxNC4zMzMzOTg4LDkuODM2ODI0NyBDMTQuMjQ2OTA4Miw5Ljc5MzgyNTggMTQuMTQ2MDAyNSw5Ljc1MDgyNjkgMTQuMDQ1MDk2OSw5LjY5MzQ5NTA0IE0xMC41OTk4ODkyLDEwLjA2NjE1MjEgQzkuNzM0OTgzNSwxMC41MzkxNCA4LjkxMzMyMzA5LDEwLjk4MzQ2MiA3LjYxNTk2NDU1LDEwLjY4MjQ2OTcgQzYuMTc0NDU1MDYsMTAuMzUyODExNSA1LjQ4MjUzMDUsOS43NjUxNTk4NyA1LjE5NDIyODYxLDkuNDIxMTY4NjkgTDguMzA3ODg5MSw1LjQwNzkzODI2IEM4LjUyNDExNTUzLDUuODM3OTI3MjMgOC44NDEyNDc2Miw2LjI4MjI0OTE3IDkuMTcyNzk0OCw2LjY5NzkwNTE4IEM4LjgyNjgzMjUyLDcuMjEzODkxOTUgOC41NTI5NDU3Miw3LjY0Mzg4MDkzIDguNDIzMjA5ODYsNy44NDQ1NDI0NSBDOC4yNzkwNTg5MSw4LjA4ODIwMjg3IDguMzUxMTM0MzksOC40MTc4NjEwOCA4LjYxMDYwNjEsOC41NzU1MjM3IEM4LjY5NzA5NjY3LDguNjMyODU1NTcgOC43OTgwMDIzMyw4LjY2MTUyMTUgOC44ODQ0OTI5LDguNjYxNTIxNSBDOS4wNzE4ODkxMyw4LjY2MTUyMTUgOS4yNDQ4NzAyNyw4LjU2MTE5MDc0IDkuMzQ1Nzc1OTQsOC40MDM1MjgxMSBDOS41MDQzNDE5OCw4LjEzMTIwMTc2IDkuNjkxNzM4MjEsNy44NDQ1NDI0NSA5Ljg5MzU0OTU0LDcuNTU3ODgzMTMgQzEwLjE5NjI2NjUsNy45MDE4NzQzMSAxMC40NzAxNTMzLDguMTc0MjAwNjYgMTAuNjU3NTQ5Niw4LjM2MDUyOTIyIEMxMS4wNzU1ODczLDguNzc2MTg1MjMgMTEuNDkzNjI1MSw5LjE0ODg0MjM0IDExLjg5NzI0NzcsOS40Nzg1MDA1NSBDMTEuNDIxNTQ5Niw5LjYwNzQ5NzI0IDExLjAwMzUxMTksOS44NTExNTc2NiAxMC41OTk4ODkyLDEwLjA2NjE1MjEgTTEwLjIxMDY4MTYsNS4zMzYyNzM0MyBDMTAuMDk1MzYwOSw1LjQ5MzkzNjA1IDkuOTY1NjI1MDIsNS42NTE1OTg2OCA5Ljg1MDMwNDI2LDUuNzk0OTI4MzQgQzkuNTA0MzQxOTgsNS4zMzYyNzM0MyA5LjI4ODExNTU2LDQuOTYzNjE2MzIgOS4xNzI3OTQ4LDQuNzA1NjIyOTMgQzkuNDE3ODUxNDEsNC44MDU5NTM2OSA5Ljc2MzgxMzY5LDUuMDIwOTQ4MTggMTAuMjEwNjgxNiw1LjMzNjI3MzQzIE0xMy41MTE3Mzg0LDQuMDc0OTcyNDQgQzEzLjY3MDMwNDQsNC4wNzQ5NzI0NCAxMy44NDMyODU1LDQuMTAzNjM4MzcgMTMuODcyMTE1Nyw0LjE3NTMwMzIgQzE0LjA0NTA5NjksNC40OTA2Mjg0NSAxMy42MjcwNTkxLDUuNDkzOTM2MDUgMTMuMDY0ODcwNCw2LjM5NjkxMjkgTDEyLjg0ODY0NCw2LjE4MTkxODQxIEMxMi42MTgwMDI1LDUuOTUyNTkwOTYgMTIuMjI4Nzk0OSw1LjU5NDI2NjgxIDExLjc4MTkyNyw1LjIwNzI3Njc0IEMxMi40NDUwMjEzLDQuNTMzNjI3MzQgMTMuMDUwNDU1Myw0LjA3NDk3MjQ0IDEzLjUxMTczODQsNC4wNzQ5NzI0NCBNMTYuNTUzMzIzNCwxMi4xNTg3NjUyIEMxNi4zMzcwOTcsMTEuNTk5Nzc5NSAxNS45OTExMzQ3LDExLjA5ODEyNTcgMTUuNTg3NTEyLDEwLjY2ODEzNjcgQzE1LjU0NDI2NjcsMTAuNjEwODA0OSAxNS40ODY2MDY0LDEwLjU2NzgwNiAxNS40Mjg5NDYsMTAuNTI0ODA3MSBDMTUuNjc0MDAyNiw5Ljk5NDQ4NzMyIDE1LjI3MDM3OTksOS4yMzQ4NDAxMyAxNC45MjQ0MTc3LDguNjkwMTg3NDMgQzE0LjY1MDUzMDksOC4yNDU4NjU0OSAxNC4yNzU3Mzg0LDcuNzQ0MjExNjkgMTMuODI4ODcwNSw3LjI0MjU1Nzg4IEMxNC4zOTEwNTkyLDYuMzgyNTc5OTMgMTUuMzU2ODcwNSw0LjY3Njk1NyAxNC44Mzc5MjcxLDMuNjczNjQ5MzkgQzE0LjY3OTM2MSwzLjM3MjY1NzExIDE0LjMxODk4MzcsMyAxMy41MTE3Mzg0LDMgTDEzLjQ5NzMyMzMsMyBDMTIuNjc1NjYyOSwzIDExLjc2NzUxMTksMy42NTkzMTY0MyAxMC45NDU4NTE1LDQuNTE5Mjk0MzggQzEwLjAyMzI4NTQsMy44NDU2NDQ5OCA5LjAxNDIyODc1LDMuMzE1MzI1MjUgOC40MDg3OTQ3NywzLjY1OTMxNjQzIEM4LjM1MTEzNDM5LDMuNjg3OTgyMzYgOC4yNzkwNTg5MSwzLjcxNjY0ODI5IDguMjM1ODEzNjMsMy43NzM5ODAxNSBDOC4yMjEzOTg1MywzLjc4ODMxMzEyIDguMTkyNTY4MzUsMy44MDI2NDYwOSA4LjE3ODE1MzI1LDMuODMxMzEyMDIgQzguMTYzNzM4MTYsMy44NDU2NDQ5OCA4LjE0OTMyMzA2LDMuODU5OTc3OTUgOC4xMzQ5MDc5NywzLjg4ODY0Mzg4IEw4LjEyMDQ5Mjg3LDMuOTE3MzA5ODEgTDQuMTI3NTExNTgsOS4wNDg1MTE1OCBDNC4xMTMwOTY0OSw5LjA0ODUxMTU4IDQuMTEzMDk2NDksOS4wNDg1MTE1OCA0LjA5ODY4MTM5LDkuMDYyODQ0NTQgTDMuMjA0OTQ1NTEsMTAuMjIzODE0OCBMMy4xNjE3MDAyMywxMC4yNjY4MTM3IEMzLjExODQ1NDk0LDEwLjMwOTgxMjYgMy4wODk2MjQ3NSwxMC4zNjcxNDQ0IDMuMDc1MjA5NjYsMTAuNDEwMTQzMyBMMy4wNzUyMDk2NiwxMC40MjQ0NzYzIEMyLjYyODM0MTcxLDExLjM0MTc4NjEgNC4yODYwNzc2MywxMy4xMzM0MDY4IDUuMDY0NDkyNzUsMTMuOTIxNzIgQzUuNzU2NDE3MzEsMTQuNjA5NzAyMyA3LjI4NDQxNzM3LDE2IDguMjM1ODEzNjMsMTYgQzguNDM3NjI0OTYsMTYgOC41OTYxOTEsMTUuOTQyNjY4MSA4Ljc0MDM0MTk1LDE1LjgxMzY3MTQgTDE0LjI2MTMyMzMsMTEuNTU2NzgwNiBDMTQuMjkwMTUzNSwxMS41NDI0NDc2IDE0LjMwNDU2ODYsMTEuNTEzNzgxNyAxNC4zMzMzOTg4LDExLjQ4NTExNTggQzE0LjM2MjIyOSwxMS41MTM3ODE3IDE0LjM3NjY0NDEsMTEuNTU2NzgwNiAxNC4zOTEwNTkyLDExLjU4NTQ0NjUgQzE0LjU2NDA0MDMsMTEuOTI5NDM3NyAxNC42NzkzNjEsMTIuMjg3NzYxOSAxNC42OTM3NzYxLDEyLjY3NDc1MTkgQzE0LjczNzAyMTQsMTMuMDYxNzQyIDE0LjcwODE5MTIsMTMuNDYzMDY1IDE0LjY1MDUzMDksMTMuODUwMDU1MSBMMTQuNjUwNTMwOSwxMy44NjQzODgxIEMxNC42MzYxMTU4LDEzLjk3OTA1MTggMTQuNjM2MTE1OCwxNC4wNzkzODI2IDE0LjY1MDUzMDksMTQuMTk0MDQ2MyBDMTQuNzUxNDM2NSwxNC44MzkwMjk4IDE1LjM1Njg3MDUsMTUuMjgzMzUxNyAxNS45OTExMzQ3LDE1LjE4MzAyMDkgQzE2LjYzOTgxNCwxNS4wODI2OTAyIDE3LjA4NjY4MTksMTQuNDgwNzA1NiAxNi45ODU3NzYyLDEzLjgzNTcyMjIgQzE2Ljg5OTI4NTcsMTMuMjc2NzM2NSAxNi43ODM5NjQ5LDEyLjcwMzQxNzkgMTYuNTUzMzIzNCwxMi4xNTg3NjUyIiBpZD0iRmlsbC0xIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
    const eraserIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZXJhc2VyPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImVyYXNlciIgZmlsbD0iIzU3NUU3NSI+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xMy41MzcwMDYxLDE0LjgyOTE1OTcgTDEwLjk2NjA1NDUsMTQuODI5MTU5NyBMOC4zMDE2MTM4LDEyLjE2NDcxOSBMMTEuMTY4NjE0NCw5LjI5NzcxODQyIEwxNS4xMjYzMjE2LDEzLjI1NTQyNTcgTDEzLjUzNzAwNjEsMTQuODI5MTU5NyBaIE0xNi43Nzc5NjMzLDEyLjY5NDQ5MDggTDExLjE2ODYxNDQsNy4xMDA3MjM0MyBMOC4zMDE2MTM4LDQuMjMzNzIyODcgQzguMDA1NTY0ODMsMy45MjIwOTIzOCA3LjUwNjk1NjA0LDMuOTIyMDkyMzggNy4xOTUzMjU1NCw0LjIzMzcyMjg3IEwzLjIyMjAzNjczLDguMjA3MDExNjkgQzIuOTI1OTg3NzYsOC41MDMwNjA2NiAyLjkyNTk4Nzc2LDkuMDAxNjY5NDUgMy4yMjIwMzY3Myw5LjI5NzcxODQyIEw2LjEwNDYxODgxLDEyLjE2NDcxOSBMMTAuMDkzNDg5MSwxNi4xNTM1ODkzIEMxMC4yMzM3MjI5LDE2LjMwOTQwNDYgMTAuNDM2MjgyNywxNi4zODczMTIyIDEwLjYzODg0MjUsMTYuMzg3MzEyMiBMMTMuODY0MjE4MSwxNi4zODczMTIyIEMxNC4wNjY3NzgsMTYuMzg3MzEyMiAxNC4yNjkzMzc4LDE2LjMwOTQwNDYgMTQuNDA5NTcxNSwxNi4xNTM1ODkzIEwxNi43Nzc5NjMzLDEzLjgwMDc3OTEgQzE3LjA3NDAxMjIsMTMuNTA0NzMwMSAxNy4wNzQwMTIyLDEzLjAwNjEyMTMgMTYuNzc3OTYzMywxMi42OTQ0OTA4IEwxNi43Nzc5NjMzLDEyLjY5NDQ5MDggWiIgaWQ9ImVyYXNlci1pY29uIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
    const pickerIcon = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjIwcHgiIGhlaWdodD0iMjBweCIgdmlld0JveD0iMCAwIDIwIDIwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCA0My4yICgzOTA2OSkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+ZXllLWRyb3BwZXI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iZXllLWRyb3BwZXIiIGZpbGw9IiM1NzVFNzUiPgogICAgICAgICAgICA8cGF0aCBkPSJNOS4xNTMzNDYwNSwxMi40ODI0OTYyIEM5LjAzMzk0MDQ0LDEyLjYxODg3MzcgOC44ODA0MTg5NSwxMi43MDQxMDk2IDguNjA3NDkxODYsMTIuNzcyMjk4MyBDNy45MDgxMTYxOCwxMi45MjU3MjMgNy4yNDI4NTYzOSwxMy41NTY0Njg4IDcuMDM4MTYxMDcsMTQuMjU1NDAzMyBDNi45Njk5MjkzLDE0LjQ3NzAxNjcgNi43NDgxNzYwMywxNC43MTU2NzczIDYuNTA5MzY0ODMsMTQuODM1MDA3NiBMNC43MzUzMzg3MSwxNS42NzAzMTk2IEM0LjY1MDA0OSwxNS43MDQ0MTQgNC41ODE4MTcyMiwxNS43MjE0NjEyIDQuNTQ3NzAxMzQsMTUuNzIxNDYxMiBMNC4yNzQ3NzQyNCwxNS40NjU3NTM0IEM0LjI3NDc3NDI0LDE1LjQ0ODcwNjIgNC4yNzQ3NzQyNCwxNS4zODA1MTc1IDQuMzI1OTQ4MDcsMTUuMjYxMTg3MiBMNS4xNjE3ODczLDEzLjQ3MTIzMjkgQzUuMjY0MTM0OTYsMTMuMjQ5NjE5NSA1LjUwMjk0NjE3LDEzLjAyODAwNjEgNS43NDE3NTczNywxMi45NTk4MTc0IEM2LjQ0MTEzMzA1LDEyLjczODIwNCA3LjA3MjI3Njk2LDEyLjA5MDQxMSA3LjI1OTkxNDMzLDExLjIzODA1MTggQzcuMjk0MDMwMjIsMTEuMTAxNjc0MyA3LjM3OTMxOTk0LDEwLjk2NTI5NjggNy40OTg3MjU1NCwxMC44Mjg5MTkzIEwxMS40MzkxMTA1LDYuOTA4MDY2OTcgTDEzLjA5MzczMSw4LjU2MTY0Mzg0IEw5LjE1MzM0NjA1LDEyLjQ4MjQ5NjIgWiBNMTYuNjA3NjY3Myw1LjI4ODU4NDQ3IEMxNi44NjM1MzY1LDUuMDMyODc2NzEgMTcsNC42NzQ4ODU4NCAxNyw0LjMzMzk0MjE2IEMxNywzLjk5Mjk5ODQ4IDE2Ljg2MzUzNjUsMy42NTIwNTQ3OSAxNi42MDc2NjczLDMuMzk2MzQ3MDMgQzE2LjA3ODg3MTEsMi44Njc4ODQzMiAxNS4yNDMwMzE4LDIuODY3ODg0MzIgMTQuNzE0MjM1NiwzLjM5NjM0NzAzIEwxMy4yMzAxOTQ1LDQuODc5NDUyMDUgTDEzLjA1OTYxNTEsNC43MDg5ODAyMSBMMTIuNTEzNzYwOSw0LjE2MzQ3MDMyIEMxMi4xNzI2MDIsMy44MjI1MjY2NCAxMS42MDk2ODk5LDMuODIyNTI2NjQgMTEuMjY4NTMxLDQuMTYzNDcwMzIgTDEwLjYwMzI3MTIsNC44MTEyNjMzMiBDMTAuMjc5MTcwMyw1LjE1MjIwNyAxMC4yNjIxMTI0LDUuNjQ2NTc1MzQgMTAuNTUyMDk3NCw1Ljk4NzUxOTAzIEw2LjU5NDY1NDU0LDkuOTI1NDE4NTcgQzYuMzA0NjY5NTEsMTAuMjMyMjY3OSA2LjA5OTk3NDE4LDEwLjU5MDI1ODggNS45ODA1Njg1OCwxMS4xMDE2NzQzIEM1LjkyOTM5NDc1LDExLjM1NzM4MiA1LjYzOTQwOTcxLDExLjY0NzE4NDIgNS4zNjY0ODI2MiwxMS43MzI0MjAxIEM0LjgwMzU3MDQ5LDExLjkwMjg5MTkgNC4yNTc3MTYzLDEyLjM4MDIxMzEgNC4wMDE4NDcxNSwxMi45NDI3NzAyIEwzLjE2NjAwNzkyLDE0LjcxNTY3NzMgQzIuODkzMDgwODMsMTUuMzEyMzI4OCAyLjk2MTMxMjYsMTUuOTI2MDI3NCAzLjMzNjU4NzM2LDE2LjMxODExMjYgTDMuNjc3NzQ2MjMsMTYuNjU5MDU2MyBDMy44OTk0OTk0OSwxNi44ODA2Njk3IDQuMjA2NTQyNDcsMTcgNC41NDc3MDEzNCwxNyBDNC43Njk0NTQ2LDE3IDUuMDI1MzIzNzUsMTYuOTMxODExMyA1LjI2NDEzNDk2LDE2LjgyOTUyODIgTDcuMDU1MjE5MDEsMTUuOTk0MjE2MSBDNy42MTgxMzExNCwxNS43MjE0NjEyIDguMDk1NzUzNTYsMTUuMTkyOTk4NSA4LjI2NjMzMjk5LDE0LjYzMDQ0MTQgQzguMzM0NTY0NzcsMTQuMzU3Njg2NSA4LjY0MTYwNzc1LDE0LjA2Nzg4NDMgOS4wNTA5OTgzOSwxMy45ODI2NDg0IEM5LjQwOTIxNTIsMTMuODk3NDEyNSA5Ljc2NzQzMjAxLDEzLjY5Mjg0NjMgMTAuMDU3NDE3LDEzLjM4NTk5NyBMMTQuMDE0ODU5OSw5LjQ0ODA5NzQxIEMxNC4zNTYwMTg4LDkuNzM3ODk5NTQgMTQuODY3NzU3MSw5LjcwMzgwNTE4IDE1LjE3NDgwMDEsOS4zNzk5MDg2OCBMMTUuODQwMDU5OSw4LjczMjExNTY4IEMxNi4xODEyMTg3LDguMzkxMTcxOTkgMTYuMTgxMjE4Nyw3LjgyODYxNDkyIDE1Ljg0MDA1OTksNy40ODc2NzEyMyBMMTUuMjYwMDg5OCw2LjkwODA2Njk3IEwxNS4xMjM2MjYyLDYuNzcxNjg5NSBMMTYuNjA3NjY3Myw1LjI4ODU4NDQ3IFoiIGlkPSJleWUtZHJvcHBlci1pY29uIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
    /* eslint-enable max-len */

    const messages = defineMessages({
        PenButton: {
            id: 'pixelGallery.penButton',
            default: 'Pen'
        },
        FillButton: {
            id: 'pixelGallery.fillButton',
            default: 'Fill'
        },
        EraserButton: {
            id: 'pixelGallery.eraserButton',
            default: 'Eraser'
        },
        PickerButton: {
            id: 'pixelGallery.pickerButton',
            default: 'Color Picker'
        },
    });

    const TOOL = {
        PEN: 'pen',
        FILL: 'fill',
        ERASER: 'eraser',
        PICKER: 'picker'
    }

    // Default Color Palette: PICO-8
    const DEFAULT_PALETTE = [
        '#1a1c2c',
        '#5d275d',
        '#b13e53',
        '#ef7d57',
        '#ffcd75',
        '#a7f070',
        '#38b764',
        '#257179',
        '#29366f',
        '#3b5dc9',
        '#41a6f6',
        '#73eff7',
        '#f4f4f4',
        '#94b0c2',
        '#566c86',
        '#333c57',
    ];
    const Palette = (() => {
        const palette = JSON.parse(localStorage.getItem(PALETTE_KEY));
        return palette || DEFAULT_PALETTE
    })();

    const hexToHsv = hex => {
        return Color.rgbToHsv(Color.hexToRgb(hex));
    }

    const hsvToHex = hsv => {
        return Color.rgbToHex(Color.hsvToRgb(hsv));
    }

    const DEFAULT_PALETTE_INDEX = 0;
    const {
        h: color,
        s: saturation,
        v: brightness
    } = hexToHsv(Palette[DEFAULT_PALETTE_INDEX]);

    Component.initialState = {
        color,
        saturation,
        brightness,
        paletteIndex: DEFAULT_PALETTE_INDEX,
    };

    class PixelGalleryToolbar extends Component {
        static get observedState () {
            return ['color', 'saturation', 'brightness', 'paletteIndex', 'tool', 'background'];
        }

        get palette () {
            return Palette;
        }

        set palette (palette) {
            const paletteString = JSON.stringify(palette || this.palette);
            localStorage.setItem(PALETTE_KEY, paletteString);
        }

        stateChangedCallback (name, oldValue, newValue) {
            if (oldValue === newValue) return;

            if (name === 'tool' && newValue === TOOL.ERASER) {
                this.unactiveColor();
            }
            
            if (name === 'color' || name === 'saturation' || name === 'brightness') {
                const color = hsvToHex({
                    h: this.state.color,
                    s: this.state.saturation,
                    v: this.state.brightness
                });
                if (this.state.tool === TOOL.PICKER) {
                    this.unactiveColor();
                    this.activedColor(color);
                } else if (this.state.tool === TOOL.ERASER) {
                    this.unactiveColor();
                    this.setBackroundColor(color);
                } else {
                    this.setColor(color);
                }
            }
        }

        setBackroundColor (color) {
            this.eraserColor.style.background = color;
            this.setState('background', color);
        }

        unactiveTool () {
            // remove all 'actived' classes
            this.querySelectorAll('.pixel-gallery-tool-button.actived').forEach(elem => {
                elem.classList.remove('actived');
                elem.style.borderColor = null;
                elem.style.boxShadow = null;
            });
        }

        handleToolClick (e) {
            e.preventDefault();

            this.unactiveTool();

            // actived
            let target = e.target;
            if (target.tagName.toLowerCase() !== 'button') {
                target = target.parentElement;
            }
            target.classList.add('actived');
            this.setState('tool', target.dataset.tool);

            if (target.dataset.tool === TOOL.ERASER) {
                // change to background color
                const {
                    h: color,
                    s: saturation,
                    v: brightness
                } = hexToHsv(this.state.background);
                this.setState({color, saturation, brightness});
            } else if (target.dataset.tool === TOOL.PICKER) {

            } else {
                // auto choose palette color
                this.activedColor(this.palette[this.state.paletteIndex])
                const {
                    h: color,
                    s: saturation,
                    v: brightness
                } = hexToHsv(this.palette[this.state.paletteIndex]);
                this.setState({color, saturation, brightness});
            }
        }

        setColor (color) {
            const paletteIndex = this.state.paletteIndex;
            const target = this.querySelector(`button[data-index="${paletteIndex}"]`);

            if (target) {
                target.style.background = color;
                target.dataset.color = color;

                const palette = this.palette;
                palette[paletteIndex] = color;
                this.palette = palette;
            }
        }

        unactiveColor () {
            // remove all 'actived' classes
            this.querySelectorAll('.pixel-gallery-palette-color.actived').forEach(elem => {
                elem.classList.remove('actived');
                elem.style.borderColor = null;
                elem.style.boxShadow = null;
            });
        }

        activedColor (color) {
            const index = this.palette.indexOf(color);
            if (index === -1) return;
            const elem = this.querySelector(`.pixel-gallery-palette-color[data-index="${index}"]`);
            if (elem) {
                elem.classList.add('actived');
            }
        }

        handleColorClick (e) {
            e.preventDefault();

            this.unactiveColor();

            // auto switch to pen
            if (this.state.tool === TOOL.ERASER || this.state.tool === TOOL.PICKER) {
                this.unactiveTool();
                const elem = this.querySelector(`.pixel-gallery-tool-button[data-tool="${TOOL.PEN}"]`);
                if (elem) {
                    elem.classList.add('actived');
                }
                this.setState('tool', TOOL.PEN);
            }

            let target = e.target;

            // add color
            if (typeof target.dataset.index === 'undefined') {
                const palette = this.palette;
                const color = Color.rgbToHex({
                    r: Math.round(Math.random() * 255),
                    g: Math.round(Math.random() * 255),
                    b: Math.round(Math.random() * 255)
                });
                const index = palette.push(color) - 1;
                this.palette = palette;
    
                // new color button
                const elem = document.createElement('button');
                elem.addEventListener('click', this.handleColorClick);
                elem.className = 'pixel-gallery-palette-color';
                elem.dataset.index = index;
                elem.style.background = color;

                target.parentElement.insertBefore(elem, target);
                target = elem;
            }

            // actived
            target.classList.add('actived');
            this.setState('paletteIndex', parseInt(target.dataset.index));

            // choose color
            const {
                h: color,
                s: saturation,
                v: brightness
            } = hexToHsv(this.palette[target.dataset.index]);
            this.setState({color, saturation, brightness});
        }

        render () {
            const isToolActived = t => (t === this.state.tool) ? 'actived' : '';
            const isColorActived = i => (i === this.state.paletteIndex) ? 'actived' : '';
            return `
                <div class="pixel-gallery-toolbar-wrapper">
                    <div class="pixel-gallery-tools-wrapper">
                        <button
                            class="pixel-gallery-tool-button ${isToolActived(TOOL.PEN)}"
                            data-tool="${TOOL.PEN}"
                            onclick="this.handleToolClick"
                        >
                            <img src="${penIcon}" alt="${messages.PenButton}" title="${messages.PenButton}" />
                        </button>
                        <button
                            class="pixel-gallery-tool-button ${isToolActived(TOOL.FILL)}"
                            data-tool="${TOOL.FILL}"
                            onclick="this.handleToolClick"
                        >
                            <img src="${fillIcon}" alt="${messages.FillButton}" title="${messages.FillButton}" />
                        </button>
                        <button
                            class="pixel-gallery-tool-button ${isToolActived(TOOL.ERASER)}"
                            data-tool="${TOOL.ERASER}"
                            onclick="this.handleToolClick"
                        >
                            <img src="${eraserIcon}" alt="${messages.EraserButton}" title="${messages.EraserButton}" />
                            <div
                                id="eraser-color"
                                style="background: ${this.state.background}"
                            ></div>
                        </button>
                    </div>
                    <div class="pixel-gallery-palette-wrapper">
                        <div class="pixel-gallery-palette">
                            ${this.palette.map((color, index) => `
                                <button
                                    class="pixel-gallery-palette-color ${isColorActived(index)}"
                                    style="background: ${color}"
                                    data-index="${index}"
                                    onclick="this.handleColorClick"
                                ></button>
                            `).join('')}
                            <button
                                class="pixel-gallery-palette-color add"
                                onclick="this.handleColorClick"
                            ></button>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    customElements.define('pixel-gallery-toolbar', PixelGalleryToolbar);
})(Scratch);
