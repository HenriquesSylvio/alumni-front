import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

export default function StudentCard() {
  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 275,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        borderRadius: "77px",
      }}
    >
      <CardContent
        sx={{
          textAlign: "center",
          margin: 0,
          padding: 1,
        }}
      >
        <Avatar
          sx={{ margin: "auto", mt: 2, mb: 2, width: 135, height: 135 }}
          src="/static/images/avatar/2.jpg"
        />
        <Typography sx={{ fontSize: 36 }} color="#D7796B" gutterBottom>
          Nom Prénom
        </Typography>
        <Typography sx={{ mb: 1, fontSize: 36 }} color="#D7796B">
          Poste
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          margin: 0,
        }}
      >
        <Button
          sx={{
            margin: "auto",
            backgroundColor: "#00A5A5",
            color: "#FFFFFF",
            borderRadius: 65,
            px: 2,
            py: 1,
          }}
          size="small"
        >
          Voir Plus
        </Button>
      </CardActions>
    </Card>
  );
}
