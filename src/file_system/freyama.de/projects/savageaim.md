# savage-aim
- A custom built website to help raiders in Final Fantasy XIV organise their Best-In-Slot gear and loot as a team.
- It also has a solver for organising optimal loot distribution to finish with each fight as quickly as possible.

- Built from scratch using Django and VueJS, deployed across 2 VMs using Ansible and Docker.
- Has a Rest API powered by django-rest-framework, and a websocket interface for real-time updates using django-channels.
- Runs celery in the background for asyncronous / scheduled tasks.

- [GitHub](https://github.com/SavageAim/app)
- [Live Website](https://savageaim.com)
