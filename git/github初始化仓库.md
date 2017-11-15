create a new repository on the command line
```sh
echo "# beacon" >> README.md
git init
git add README.md
git commit -m "first commit"
git remote add origin git@github.com:metanoia1989/beacon.git
git push -u origin master
```

push an existing repository from the command line
```sh
git remote add origin git@github.com:metanoia1989/beacon.git
git push -u origin master
```