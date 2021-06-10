import React from 'react';
import styled from 'styled-components';
import MainMenu from '../../common/MainMenu';
import Footer from '../../common/Footer';
import GlobalStyles from '../../../theme/globalStyles';
import VerticalSpace from '../../ui/VerticalSpace';

const Container = styled.div`
    padding: 1.5em;
    max-width: 75ch;
    margin: 0 auto;
`;

export default function BaseLayout({ route, head, children }) {
    return (
        <html lang="en">
            {head}
            <body>
                <GlobalStyles />
                <Container>
                    <header>
                        <MainMenu route={route} />
                    </header>
                    <main>{children}</main>
                    <VerticalSpace size={2} />
                    <footer>
                        <hr />
                        <Footer />
                    </footer>
                </Container>
            </body>
        </html>
    );
}
