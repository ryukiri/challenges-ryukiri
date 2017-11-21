# Challenges

This repo will contain of the code for the individual challenges for the quarter. The code for each challenge will be stored in its own folder (`challenge#`).

1. [challenge1](./challenge1/)
2. [challenge2](./challenge2/)
3. [challenge3](./challenge3/README/)
4. [challenge4](./challenge4/README/)
4. [challenge5](./challenge5/README/)
4. [challenge6](./challenge6/README/)
4. [challenge7](./challenge7/README/)

**Important**: By accepting the Github Classroom invite, this repo was created as a copy (not a true fork) of the original `challenges` repo. This is so that you will have access to view your challenges repo and the original `challenges` repo, and only you and the teaching will have access to view your `challenges` repo. You *DO NOT* need to fork this repo.

## Add upstream repo as remote

After cloning this repo, run the following commands (you only need to do this once per computer):

```bash
cd challenges-{username}
git remote add upstream https://github.com/info343a-au17/challenges.git
```

This will register the upstream `challenges` repo (where the teaching team will commit the starter code for each challenge) as a `remote` that you can `git pull` from.

## Updating your repo with new starter code

When a new assingment has been posted, you must run the following command to update your repo with the starter code for that week's challenge.

```bash
git pull upstream master
```

## Working on challenges

Create a new branch in the repo (the name will be specified in the write up) and switch to it, then update your repo with the starter code for the week's challenge, .

```
# New assignment posted, create and switch to new branch
git checkout -b challenge2

# Update repo
git pull upstream master

# cd into the folder for the challenge
cd challenge2
```

Any commits you make while working on the challenge should be made in the directory and branch for that challenge.

## Turning in your challenge

When you are ready to turn in your challenge, please create a pull request from your challenge branch into `master`.

```bash
# Commit your files
git add .
git commit -m "Files for Challenge 2"

# Push your new branch to github
git push --set-upstream origin challenge2
```

Go to your repo on Github, and click the "New pull request" button at the top to create a new pull request.

When your pull request has been created and you are ready to have it graded, **please submit the url to the opened pull request to the assignment on Canvas**.

## Feedback

The teaching team will provide feedback on your challenge using the PR code review tools on Github.

Final grades for each challenge will posted on Canvas.
