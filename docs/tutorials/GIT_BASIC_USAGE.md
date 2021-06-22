# Git basic usage commands

[BACK TO INDEX](README.md)

This basic tutorial will help the developers to understand the daily work using a Git repository. Each developer has to know:

1. How to clone (download) a repository

2. How to create his individual branch

3. How to merge the finished work

4. How to update his branch with new source code updates

The following video explains the concepts behind condiguration management with Git and shows some practical commands:

https://www.youtube.com/watch?v=Q41rqjtKtqk

## 1. How to clone a repository

In case you are not a developer in the Futuro repository, ask it to one of the team members

In case you do not have Git in your Windows, you have to install it: https://git-scm.com/download/win

Open CMD (Start > Run > cmd) and enter two commands:

```
cd Documents (or Documentos)
git clone https://gitlab.com/tassiovale/futuro
```

This command will download and set up the repository in the `Documents\futuro` folder

## 2. How to create the WIP (work in progress) branch

Open CMD (Start > Run > cmd)

Go to the project folder:

```
cd Documents
cd futuro
```

### Check the status o the repository

To check the status of the repository in your local machine, use the command:

```
git status
```

It will show the branch you are set at the moment, and the files not included in your commit

### Create the WIP branch

To create and go to the new branch, there are two ways to do it:

OBS.: before creating the branch, run `git status` and check if you are in the `develop`. It has to be the default branch to create new ones.

```
git pull (to update the develop branch)
git checkout -b tassiovale/tarefa-x
```

or

```
git pull
git branch tassiovale/tarefa-x
git checkout tassiovale/tarefa-x
```

Done! You are now in the WIP branch

ATTENTION: the branch name has to follow the standard `<developer_username>/<short_task_description>`

## 3. Always save the work of your branch

To save the work in your WIP branch:

1. Open CMD

2. Make sure you are in the `Documents\futuro` folder

3. Update your branch

```
git add . (to include all changed files in the upcoming commit)
git commit -m "description of the change"
git push origin tassiovale/tarefa-x (send the local update to the remote repository)
```

## 4. How to merge the finished work

Once the work in the WIP branch is done, you have to merge it into `develop`

```
git add .
git commit -m "description of the change" (to make sure all changes are saved into the WIP branch)
git checkout develop
git merge tassiovale/tarefa-x
git push origin develop
```
In case there is a CONFLICT error in the merge, you have to locate the conflicted files and change it (talk to the other developers to understand the changes in `develop`). Once you solved the conflicts manually:

```
git add .
git commit -m "merge fix"
git push origin develop
```

To sanitize the repository, delete the WIP branch locally and remotely:

```
git branch -d tassiovale/tarefa-x (local)
git push origin --delete tassiovale/tarefa-x (remote)
```

## 4. Update your branch if necessary

To update the `develop` branch any moment:

```
git pull
```

In case it does not work, try:

```
git fetch --all
git reset --hard origin/develop
```


[BACK TO INDEX](README.md)