import { Button, Stack } from '@mui/material';
import { Box, padding } from '@mui/system';
import * as React from 'react';
import EventFeed from '../components/EventFeed/EventFeed';
import MainFeed from '../components/MainFeed/MainFeed';

export default function Feed() {
    return (
        <div style={{display: "flex"}}>
            <Stack direction="column" alignItems="center" spacing={5} sx={{display:"flex", flex: 1, border: '1px dashed grey', color:"#CA4B38"}}>
                <h1>Fil d'actualités</h1>
                <Box width="95%">
                    <MainFeed titre="La Normandie Web School recrute !" description="Nouvelle école dans le numérique, l'administration à besoin de vous, recherche tel type d'emploi"></MainFeed>
                </Box>
                <Box width="95%">
                    <MainFeed titre="La Normandie Web School recrute !" description="Nouvelle école dans le numérique, l'administration à besoin de vous, recherche tel type d'emploi"></MainFeed>
                </Box>
            </Stack>

            <div style={{width:"25%"}}>
                <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={4} marginBottom={5} color="#CA4B38">
                    <h2>Prochains évènements</h2>
                    {/* Box personnalisée pour les feeds à droite*/}
                    <EventFeed titre="Titre 1" description="texte 1 texte 1 texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1 "/>
                    <EventFeed titre="Titre 3" description="texte 3"/>
                    <EventFeed titre="Titre 5" description="texte 5"/>
                </Stack>

                <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={5} color="#CA4B38">
                    <h2>Offres d'emploi</h2>
                    <EventFeed titre="Titre 1" description="texte 1"/>
                    <EventFeed titre="Titre 3" description="texte 3"/>
                    <EventFeed titre="Titre 5" description="texte 5"/>
                </Stack>
            </div>
        </div>
    );
}
