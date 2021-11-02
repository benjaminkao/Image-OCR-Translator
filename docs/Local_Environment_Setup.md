Setting Up Your Local Environment
===


Follow these instructions to properly setup your local environment to be able to run the project and connect your project to Google Cloud Services.


# Pulling From GitHub
These instructions are assuming you are using Git Bash. If you are using GitHub desktop, the steps will be the same but you will be using the GUI instead of a command line.


1. Please first clone the GitHub repo:
```bash
git clone https://github.com/benjaminkao/CSC847-Project-3-Group-3.git
```

2. Switch over to the development branch:
```bash
git checkout development
```

<i>Note: This will be the branch you will be pushing and pulling code from so we can keep the <b>main</b> branch clean with only working code.</i>


# NPM Installation
These instructions are assuming you finished the <i>Pulling From GitHub</i> instructions and that you already have <b>npm</b> installed. If you do not have <b>npm</b> installed, please download NodeJS <a href="https://nodejs.org/en/download/">here</a>.

1. Make sure you are in the root directory of the GitHub repo.
2. Run this command:
```nodejs
npm install
```
3. Go into the <i>src/client</i> directory:
```nodejs
cd src/client
```
4. Run this command:
```nodejs
npm install
```
5. Go into the <i>src/server</i> directory:
```nodejs
cd ../server
```
6. Run this command:
```nodejs
npm install
```

# Setting up Google Cloud Authentication
These instructions are assuming you finished the <i>Setting up Google Cloud Authentication</i> instructions. You can also follow the instructions <a href="https://cloud.google.com/vision/docs/setup#sa-create">here</a>.

## Creating a new Service Account
1. Create a new Google Cloud Project
2. After making sure you are in the newly created Google Cloud Project, navigate to <i>IAM & Admin -> Service Accounts</i>.
3. Click on <b>+ Create Service Account</b> at the top of the page.
4. Select a project.
5. In the Service account name field, enter a name. The Cloud Console fills in the Service account ID field based on this name.

6. In the Service account description field, enter a description. For example, Service account for quickstart.

7. Click Create and continue.
8. Click the Select a role field.

9. Under Quick access, click Basic, then click Owner.
10. Click Continue.
11. Click Done to finish creating the service account.


## Generating a JSON Key for the Service Account
1. In the Cloud Console, click the email address for the service account that you created.
2. Click Keys.
3. Click Add key, then click Create new key.
4. Click Create. A JSON key file is downloaded to your computer.
5. Click Close.



# Moving the JSON Key
1. After downloading your Service Account's JSON key to your local machine, rename it to <i>hidden.json</i> because I have already added <i>hidden.json</i> to the <i>.gitignore</i>.

<span style="color:red"><b>NOTE: If you forget to rename your JSON key to <i>hidden.json</i>, you will push your JSON key to GitHub where it will be susceptible to being stolen. Also, the path of the key file is hardcoded so you may run into errors if you do not rename the file.</b></span>

2. Move your JSON key file to the root directory of the GitHub repo:

```
- docs
- src
.gitignore
hidden.json
LICENSE
package-lock.json
package.json
README.md
```


# Running the Program

This should be done after following all of the above steps or else you may run into errors.

1. Make sure you are in the root directory of the GitHub repo
2. Run this command and it should open up your browser to <i>http://localhost:3000/</i>
```nodejs
npm run dev
```

3. If you want to stop running the application, press <b>Ctrl+C</b> twice.



<br />
<br />
<br />

Now, whenever you save changes to any of the files, your application will automatically be restarted.


