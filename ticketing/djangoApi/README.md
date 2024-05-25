# How to start the backend server (Windows)

## Establish venv

### `py -m venv env`

## Activate the venv

### `.\env\Scripts\activate`

## Install dependencies

### `pip install django`

### `pip install djangorestframework`

### `pip install django-cors-headers`

### `python -m pip install Pillow`

### Or run the requirements.txt file

### `pip install -r requirements.txt`

## Create the migrations

### `python manage.py makemigrations`

## Run migrations

### `python manage.py migrate`


## Start server

### `python manage.py runserver` {port} 