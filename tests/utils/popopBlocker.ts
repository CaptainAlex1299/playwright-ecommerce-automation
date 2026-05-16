import { Page } from '@playwright/test';

export function blockPopups(page: Page) {
    page.route('**/*', (route) => {
        const url = route.request().url();

        const blocked = [
            'doubleclick',
            'googlesyndication',
            'ads',
            'popup',
        ];

        if (blocked.some(b => url.includes(b))) {
            return route.abort();
        }

        route.continue();
    });
}