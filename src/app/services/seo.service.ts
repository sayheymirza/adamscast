import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SeoService {
    private document = inject(DOCUMENT);

    public set(params: ISEOParams) {
        this.clearHeadDOM();

        this.setTitle(params.title);

        // og title
        this.createHeadDOM({
            type: 'meta',
            attr: {
                property: 'og:title',
                content: params.title,
            },
        });

        if (params.description) {
            this.createHeadDOM({
                type: 'meta',
                attr: {
                    name: 'description',
                    content: params.description,
                },
            });

            // og description
            this.createHeadDOM({
                type: 'meta',
                attr: {
                    property: 'og:description',
                    content: params.description,
                },
            });
        }

        if (params.keywords) {
            this.createHeadDOM({
                type: 'meta',
                attr: {
                    name: 'keywords',
                    content: params.keywords.join(', '),
                },
            });

            // og keywords
            this.createHeadDOM({
                type: 'meta',
                attr: {
                    property: 'og:keywords',
                    content: params.keywords.join(', '),
                },
            });
        }

        if (params.image) {
            this.createHeadDOM({
                type: 'meta',
                attr: {
                    property: 'og:image',
                    content: params.image,
                },
            });
        }

        if (params.url) {
            this.createHeadDOM({
                type: 'meta',
                attr: {
                    property: 'og:url',
                    content: params.url,
                },
            });

            // create canonical link
            this.createHeadDOM({
                type: 'link',
                attr: {
                    rel: 'canonical',
                    href: params.url,
                },
            });
        }

        if (params.type) {
            this.createHeadDOM({
                type: 'meta',
                attr: {
                    property: 'og:type',
                    content: params.type,
                },
            });
        }

        if (params.jsonLd) {
            this.createHeadDOM({
                type: 'script',
                attr: {
                    type: 'application/ld+json',
                },
                content: JSON.stringify(params.jsonLd),
            });
        }
    }

    public setTitle(title: string) {
        this.document.title = 'آدامس کست | ' + title;
    }

    public createHeadDOM(params: IHeadDomParams, id: string = 'seo-head') {
        const element = this.document.createElement(params.type);

        if (params.attr) {
            const keys = Object.keys(params.attr);

            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                let value = params.attr[key];

                element.setAttribute(key, value);
            }
        }

        if (params.content) {
            element.textContent = params.content;
        }

        element.id = id;

        this.document.head.appendChild(element);
    }

    public clearHeadDOM(id: string = 'seo-head') {
        // remove all elements by 'seo-head' id
        const elements = this.document.head.querySelectorAll(`#${id}`);
        elements.forEach((element) => {
            element.parentElement!.removeChild(element);
        });
    }
}


interface IHeadDomParams {
    type: 'meta' | 'link' | 'script' | 'style';
    attr: {
        [key: string]: string;
    };
    content?: string;
}

interface ISEOParams {
    title: string;
    description: string;
    keywords?: string[];
    image?: string;
    url?: string;
    type?: 'website';
    jsonLd?: any;
}