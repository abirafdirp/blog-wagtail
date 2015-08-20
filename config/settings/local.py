# -*- coding: utf-8 -*-
'''
Local settings

- Run in Debug mode
- Use console backend for emails
- Add Django Debug Toolbar
- Add django-extensions as app
'''

from .common import *  # noqa

# DEBUG
# ------------------------------------------------------------------------------
DEBUG = env.bool('DJANGO_DEBUG', default=True)
TEMPLATES[0]['OPTIONS']['debug'] = DEBUG

# SECRET CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#secret-key
# Note: This key only used for development and testing.
SECRET_KEY = env("DJANGO_SECRET_KEY", default='CHANGEME!!!')

# Mail settings
# ------------------------------------------------------------------------------
EMAIL_HOST = 'localhost'
EMAIL_PORT = 1025
EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND',
                    default='django.core.mail.backends.console.EmailBackend')

# CACHING
# ------------------------------------------------------------------------------
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}

# django-debug-toolbar
# ------------------------------------------------------------------------------
# MIDDLEWARE_CLASSES += ('debug_toolbar.middleware.DebugToolbarMiddleware',)
# INSTALLED_APPS += ('debug_toolbar', )

# INTERNAL_IPS = ('127.0.0.1', '10.0.2.2',)

# DEBUG_TOOLBAR_CONFIG = {
#     'DISABLE_PANELS': [
#         'debug_toolbar.panels.redirects.RedirectsPanel',
#     ],
#     'SHOW_TEMPLATE_CONTEXT': True,
# }

# django-extensions
# ------------------------------------------------------------------------------
INSTALLED_APPS += ('django_extensions',
                   'debug_toolbar',
                   )

# TESTING
# ------------------------------------------------------------------------------
TEST_RUNNER = 'django.test.runner.DiscoverRunner'

# Your local stuff: Below this line define 3rd party library settings

COMPRESS_ENABLED = False
SSLIFY_DISABLE = True

SEO_JS_ENABLED = True
SEO_JS_BACKEND = "django_seo_js.backends.PrerenderHosted"
SEO_JS_PRERENDER_URL = "http://127.0.0.1:3000/"
SEO_JS_PRERENDER_RECACHE_URL = "http://127.0.0.1:3000/recache"