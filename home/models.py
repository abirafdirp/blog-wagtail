from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailsearch import index


class HomePage(Page):
    overview = RichTextField(blank=True)

    content_panels = Page.content_panels + [
        FieldPanel('overview', classname="full")
    ]




class BlogPage:
    date = models.DateField('Post date')
    intro = models.CharField(max_length=250)

    body = RichTextField(blank=True)

    search_fields = Page.search_fields + (
        index.FilterField('date'),
        index.SearchField('body'),
        index.SearchField('intro'),
    )

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        FieldPanel('intro'),

        FieldPanel('body', classname='full')
    ]
