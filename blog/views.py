from django.http import HttpResponse


def pdf_view(request):
    with open('/home/abirafdirp/blog-wagtail/blog-wagtail/media/documents/CV.pdf', 'rb') as pdf:
        response = HttpResponse(pdf.read(), content_type='application/pdf')
        response['Content-Disposition'] = 'filename=some_file.pdf'
        return response
    pdf.closed
