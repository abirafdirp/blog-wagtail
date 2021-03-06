from __future__ import unicode_literals

from django.db import models

from modelcluster.fields import ParentalKey

from wagtail.wagtailcore.models import Page
from wagtail.wagtailcore.models import Orderable
from wagtail.wagtailcore import blocks
from wagtail.wagtailcore import fields
from wagtail.wagtailcore.fields import StreamField
from wagtail.wagtailadmin.edit_handlers import FieldPanel
from wagtail.wagtailadmin.edit_handlers import StreamFieldPanel
from wagtail.wagtailadmin.edit_handlers import MultiFieldPanel
from wagtail.wagtailadmin.edit_handlers import PageChooserPanel
from wagtail.wagtailadmin.edit_handlers import InlinePanel
from wagtail.wagtailimages.edit_handlers import ImageChooserPanel
from wagtail.wagtailimages.blocks import ImageChooserBlock
from wagtail.wagtailsearch import index


class BlogIndexPage(Page):
    featured_posts = StreamField([
        ('post', blocks.PageChooserBlock(required=False)),
    ])

    content_panels = Page.content_panels + [
        StreamFieldPanel('featured_posts'),
    ]

    api_fields = ('featured_posts', 'title')


class ContentBlock(blocks.StreamBlock):
    subheading = blocks.CharBlock(help_text='Subheading')
    subheading_background = ImageChooserBlock(required=False,
                                      help_text='Subheading Background Image')
    content = blocks.RichTextBlock()
    full_image = ImageChooserBlock(required=False,
                                   help_text='Full Image')
    code_block = blocks.RawHTMLBlock(help_text="Must Use http://syntaxhighlight.in/")
    pre_tag = blocks.TextBlock()
    pre_tag_general = blocks.TextBlock()
    pre_tag_python = blocks.TextBlock()
    smaller_subheading = blocks.CharBlock(help_text='Subheading')
    raw_html = blocks.RawHTMLBlock()

    search_fields = Page.search_fields + (
        index.SearchField('subheading'),
        index.SearchField('content'),
    )


class CategoryBlock(blocks.StreamBlock):
    name = blocks.CharBlock(max_length=50)


class BlogPostPage(Page):
    angular_url = models.CharField\
        (max_length=200,
         help_text="Format must be underscored and lowercased title"
         )
    title_extended = models.CharField(max_length=60, blank=True, null=True)
    author = models.CharField(max_length=50)
    date = models.DateField()
    categories = fields.StreamField(CategoryBlock())
    main_image = models.ForeignKey(
        'wagtailimages.Image',
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name='+',
    )
    main_img_disc = models.CharField(max_length=50, blank=True, null=True,
                                     help_text='main image disclaimer')
    thumbnail_image = models.ForeignKey(
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
    related_post = StreamField([
        ('post', blocks.PageChooserBlock(required=False))
    ])

    content_panels = Page.content_panels + [
        FieldPanel('angular_url'),
        FieldPanel('title_extended'),
        FieldPanel('author'),
        FieldPanel('date'),
        StreamFieldPanel('categories'),

        ImageChooserPanel('main_image'),
        FieldPanel('main_img_disc'),
        ImageChooserPanel('thumbnail_image'),
        ImageChooserPanel('main_background_image'),
        FieldPanel('intro'),
        StreamFieldPanel('content'),
        StreamFieldPanel('related_post'),
    ]

    search_fields = Page.search_fields + (
        index.SearchField('title_extended'),
        index.SearchField('author'),
        index.SearchField('date'),
        index.SearchField('intro'),
    )

    api_fields = ('angular_url', 'title_extended', 'author', 'date',
                  'main_image', 'main_background_image', 'thumbnail_image',
                  'categories', 'intro', 'content', 'related_post', 'category',
                  'main_img_disc')

    class Meta:
        verbose_name = 'Blog Post'


