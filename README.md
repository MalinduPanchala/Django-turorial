# ShareColomboTest

First of all, make sure the MySQL database server is up and running. Unless the application is not going to work since Django modules checks for the database connection when deploying.

The project files can be cloned from here. (https://github.com/MalinduPanchala/ShareColomboTest.git)

Or can be cloned by using Git CLI using 

git clone https://github.com/MalinduPanchala/ShareColomboTest.git


To install all the dependencies, we need to create a virtual environment. If virtualenv module is not installed, type the following command in the terminal

pip install virtualenv
Then to make a virtual environment, run the following command and it will create a folder named .env  inside the root folder. You may change a different name for the folder name instead of “.env”.

python -m venv .env

Then to install all the required dependencies for this project run the following commands in the root folder.

For windows, cd .env/Scripts Then activate
For linux, Source .env/bin/activate

Now to install all the dependencies, run the following command after going back to the root folder again.

pip install -r requirements.txt

Now we can go inside the restauarant_app folder. Inside this folder, there’s a folder with the same name. This folder contains all the code segments responsible for the logic. In this folder, there’s a file named “settings.py“. Inside this file, you have to change the database configurations according to the MySQL database (in Line 82 to Line 91)

After these changes, the application is ready to deploy. In the terminal, go back to the first “restauarant_app” folder and run the following command.

python manage.py runserver

In case of errors regarding migrations, please run the following command and then try running the previous command again. 

python manage.py migrate

python manage.py migrate 

Once the server is deployed, the terminal will show the following message.

System check identified no issues (0 silenced).
March 05, 2022 - 05:53:46
Django version 4.0.3, using settings 'restauarant_app.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CTRL-BREAK.

From http://127.0.0.1:8000/order/index/ , The index page can be accessed

