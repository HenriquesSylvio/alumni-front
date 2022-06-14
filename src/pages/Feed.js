import { Button, Stack } from '@mui/material';
import { Box, padding } from '@mui/system';
import * as React from 'react';
import EventFeed from '../components/EventFeed/EventFeed';

export default function Feed() {
    return (
        <div style={{display: "flex"}}>
            <Box sx={{display:"flex", flex: 1, border: '1px dashed grey'}}><h1>Feed Page</h1></Box>

            <div style={{width:"25%"}}>
                <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={4} marginBottom={5}>
                    <h2>Prochains évènements</h2>
                    {/* Box personnalisée pour les feeds à droite*/}
                    <EventFeed titre="Titre 1" couleur="#CA4B38" description="texte 1 texte 1 texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1  texte 1 "/>
                    <EventFeed titre="Titre 3" description="texte 3"/>
                    <EventFeed titre="Titre 5" description="texte 5"/>
                </Stack>

                <Stack className="event-right" direction="column" justifyContent="space-evenly" alignItems="center" spacing={5}>
                    <h2>Offres d'emploi</h2>
                    <EventFeed titre="Titre 1" description="texte 1"/>
                    <EventFeed titre="Titre 3" description="texte 3"/>
                    <EventFeed titre="Titre 5" description="texte 5"/>
                </Stack>
            </div>
        </div>
    );
}
