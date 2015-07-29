from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore import blocks
from wagtail.wagtailcore import fields
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsearch import index


class MainHeadingBlock(blocks.StructBlock):
    title = blocks.CharBlock()
    date = models.DateField('Post date')
    image = ImageChooserBlock(required=False)
    intro = blocks.TextBlock()


class ContentBlock(blocks.StreamBlock):
    heading = blocks.CharBlock()
    image = ImageChooserBlock(required=False)
    content = blocks.RichTextBlock()


class BlogPostBlockPage(Page):
    main_heading = fields.StreamField(MainHeadingBlock())
    content = fields.StreamBlock(ContentBlock())

    class Meta:
        verbose_name = 'Blog Post Block'


class BlogPostPage(Page):
    date = models.DateField('Post date')
    main_heading = fields.StreamField([
        ('text', blocks.CharBlock()),
        ('image', ImageChooserBlock()),
    ])
    intro = models.CharField(max_length=250)

    headings = fields.StreamField([
        ('text', blocks.CharBlock()),
        ('image', ImageChooserBlock(required=False))
    ])
    body = fields.RichTextField(blank=True)

    search_fields = Page.search_fields + (
        index.FilterField('date'),
        index.SearchField('main_heading'),
        index.SearchField('body'),
        index.SearchField('intro'),
    )

    content_panels = Page.content_panels + [
        FieldPanel('date'),
        StreamFieldPanel('main_heading'),
        FieldPanel('intro'),

        StreamFieldPanel('headings'),

        FieldPanel('body')
    ]

    class Meta:
        verbose_name = 'Blog Post'


