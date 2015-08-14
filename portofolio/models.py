from __future__ import unicode_literals

from django.db import models

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore import blocks
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailcore.fields import StreamBlock
from wagtail.wagtailcore.fields import RichTextField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsearch import index


class ItemBlock(blocks.StructBlock):
    title = blocks.CharBlock()
    image = ImageChooserBlock()
    description = blocks.RichTextBlock()
    link = blocks.CharBlock()

class PortofolioPage(Page):
    item = StreamField([
        ('item', ItemBlock()),
    ])

    content_panels = Page.content_panels + [
        StreamFieldPanel('item')
    ]

    api_fields = ('item',)




