# SFU Auth for Discord Servers

**Requirements**
- There is a base role that must be granted to allow access to the rest of the server
- Users initially join without the base role

**Workflow**
1. Invite user to server
2. Have user go through CAS login
3. Have user supply CAS-generated token and their Discord tag
4. Only if the token and Discord tag are valid, do we grant them the base role
