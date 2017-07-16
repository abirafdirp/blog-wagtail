blog
==============================

Warning, this project is one of my first projects. The code is a mess, docs are modest etc so I'm sorry if you get lost or anything. Especially because Wagtail (as of this project version) still doesn't spit the image URL in its API, I need to modify the wagtail source. Problem is, due to lack of my knowledge at that time, I didn't track the changes properly so what I did just publish the final version of the modified wagtail.

This is my personal blog with modified wagtail to include image URL path in the API and modified the sitemap module to correctly generate angular urls.

Current implementation of my image API URL is still a mess. Please do not follow this. Modified wagtail repo https://github.com/abirafdirp/wagtail-fork


LICENSE: BSD

Settings
------------

This project relies extensively on environment settings which **will not work with Apache/mod_wsgi setups**. It has been deployed successfully with both Gunicorn/Nginx and even uWSGI/Nginx.

For configuration purposes, the following table maps the 'blog' environment variables to their Django setting:

======================================= =========================== ============================================== ======================================================================
Environment Variable                    Django Setting              Development Default                            Production Default
======================================= =========================== ============================================== ======================================================================
DJANGO_CACHES                           CACHES (default)            memcached                                      memcached
DATABASE_URL                            DATABASES (default)         See code                                       See code
DJANGO_DEBUG                            DEBUG                       True                                           False
DJANGO_SECRET_KEY                       SECRET_KEY                  CHANGEME!!!                                    raises error
======================================= =========================== ============================================== ======================================================================

Getting up and running
----------------------

Basics
^^^^^^

The steps below will get you up and running with a local development environment. We assume you have the following installed:

* pip
* virtualenv
* PostgreSQL

First make sure to create and activate a virtualenv_, then open a terminal at the project root and install the requirements for local development::

    $ pip install -r requirements/local.txt

.. _virtualenv: http://docs.python-guide.org/en/latest/dev/virtualenvs/

Create a local PostgreSQL database::

    $ createdb blog-wagtail

Run ``migrate`` on your new database::

    $ python manage.py migrate

You can now run the ``runserver_plus`` command::

    $ python manage.py runserver_plus

Open up your browser to http://127.0.0.1:8000/ to see the site running locally.
