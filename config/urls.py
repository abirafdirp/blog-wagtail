from django.conf.urls import include, url
from django.conf import settings
from django.contrib import admin
from django.views.generic import TemplateView

from wagtail.wagtailadmin import urls as wagtailadmin_urls
from wagtail.wagtaildocs import urls as wagtaildocs_urls
from wagtail.wagtailcore import urls as wagtail_urls
from wagtail.contrib.wagtailapi import urls as wagtailapi_urls
from wagtail.contrib.wagtailsitemaps.views import sitemap

urlpatterns = []
if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns
    from django.views.generic import TemplateView

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += [
        url(r'^400/$', 'django.views.defaults.bad_request'),
        url(r'^403/$', 'django.views.defaults.permission_denied'),
        url(r'^404/$', 'django.views.defaults.page_not_found'),
        url(r'^500/$', 'django.views.defaults.server_error'),
    ]

urlpatterns += [
    url(r'^django-admin/', include(admin.site.urls)),

    url(r'^admin/', include(wagtailadmin_urls)),
    url(r'^documents/', include(wagtaildocs_urls)),

    url(r'^search/$', 'search.views.search', name='search'),

    url(r'^api/', include(wagtailapi_urls)),

    # partials initilization
    url(r'^((?!_page).)*$',
            TemplateView.as_view(template_name='base.html'),
            name='base'),
    url(r'', include(wagtail_urls)),

    url('^sitemap\.xml$', sitemap),

]



