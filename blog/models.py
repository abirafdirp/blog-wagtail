from __future__ import unicode_literals

from django.db import models

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.models import Orderable
from wagtail.wagtailcore import blocks
from wagtail.wagtailcore import fields
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtail.wagtailadmin.edit_handlers import MultiFieldPanel
from wagtail.wagtailadmin.edit_handlers import PageChooserPanel
from wagtail.wagtailadmin.edit_handlers import InlinePanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsearch import index


class BlogIndexPage(Page):
    content_panels = Page.content_panels + [
        InlinePanel('related_links', label="Related links"),
    ]


class LinkFields(models.Model):
    link_external = models.URLField("External link", blank=True)
    link_page = models.ForeignKey(
        'wagtailcore.Page',
        null=True,
        blank=True,
        related_name='+'
    )

    @property
    def link(self):
        if self.link_page:
            return self.link_page.url
        else:
            return self.link_external

    panels = [
        FieldPanel('link_external'),
        PageChooserPanel('link_page'),
    ]

    class Meta:
        abstract = True


# Related links
class RelatedLink(LinkFields):
    title = models.CharField(max_length=255, help_text="Link title")

    panels = [
        FieldPanel('title'),
        MultiFieldPanel(LinkFields.panels, "Link"),
    ]

    class Meta:
        abstract = True


class BlogIndexRelatedLink(Orderable, RelatedLink):
    page = ParentalKey('BlogIndexPage', related_name='related_links')


class ContentBlock(blocks.StreamBlock):
    subheading = blocks.CharBlock(help_text='Subheading')
    subheading_background = ImageChooserBlock(required=False,
                                      help_text='Subheading Background Image')
    content = blocks.RichTextBlock()
    full_image = ImageChooserBlock(required=False,
                                   help_text='Full Image')

    search_fields = Page.search_fields + (
        index.SearchField('subheading'),
        index.SearchField('content'),
    )


class BlogPostPage(Page):
    title_extended = models.CharField(max_length=60, blank=True, null=True)
    author = models.CharField(max_length=50)
    date = models.DateField()
    main_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    main_background_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    intro = fields.RichTextField(null=True, blank=True)
    content = fields.StreamField(ContentBlock())

    content_panels = Page.content_panels + [
        FieldPanel('title_extended'),
        FieldPanel('author'),
        FieldPanel('date'),
        ImageChooserPanel('main_image'),
        ImageChooserPanel('main_background_image'),
        FieldPanel('intro'),
        StreamFieldPanel('content'),
    ]

    search_fields = Page.search_fields + (
        index.SearchField('title_extended'),
        index.SearchField('author'),
        index.SearchField('date'),
        index.SearchField('intro'),
    )

    api_fields = ('title_exntended', 'author', 'date', 'main_image',
                  'main_background_image', 'intro', 'content')

    class Meta:
        verbose_name = 'Blog Post'


