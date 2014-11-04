# -*- coding: utf-8 -*-
from __future__ import with_statement
from fabric.api import *

env.hosts = [
    'YOUR_USER@PROJECT_DOMAIN.COM',
]
env.warn_only = True
python = '/deploy/{{ project_name }}/bin/python'
pip = '/deploy/{{ project_name }}/bin/pip'


def deploy():
    with cd('/deploy/{{ project_name }}/{{ project_name }}'):
        run('git pull')
        run(pip + ' install -r requirements.txt --upgrade')
        run(python + ' manage.py collectstatic --noinput --settings=project.settings_production')
        # restart nginx
        run('supervisorctl restart {{ project_name }}')


def deploy_migrate():
    with cd('/deploy/{{ project_name }}/{{ project_name }}'):
        run('git pull')
        run(pip + ' install -r requirements.txt --upgrade')
        run(python + ' manage.py collectstatic --noinput --settings=project.settings_production')
        run(python + ' manage.py syncdb --settings=project.settings_production')
        run(python + ' manage.py migrate --settings=project.settings_production')
        # restart nginx
        run('sudo supervisorctl restart {{ project_name }}')
