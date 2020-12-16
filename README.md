# ARC Libor/RFR

Christophe LEMIERE & Jean-Guillaume HUBERT

# [Quick start](#quick-start)

```bash
# clone the repo
git clone https://github.com/chrislem/hack2020.git

# change directory
cd hack2020

# install the repo with npm
npm install

# start the server
npm start

```
in your browser go to [http://localhost:4200](http://localhost:4200) 


# [Commit changes](#commit-changes)

```bash
# see list of new/modified files
git status 

git add <file to commit>

git commit -m '<commit message>'

git push

***** DO NOT COMMIT node_modules *****
```

sudo kill $(sudo lsof -t -i:4200)
ng serve --proxy-config proxy.conf.json