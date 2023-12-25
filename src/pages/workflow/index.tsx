import { styled } from "@mui/material/styles";
import { DashboardLayout } from "@components/dashboard-layout";
import { Box, Button, Grid, Typography } from "@mui/material";
import Head from "next/head";
import Image from "next/image";

const CustomGridItem = styled(Grid)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const CustomTypography = styled(Typography)({
  fontSize: "1.1rem",
  textAlign: "start",
  lineHeight: "1.5",
  color: "#515151",
  marginTop: "1.5rem",
});

const CustomBox = styled(Box)(({ theme }) => ({
  flexDirection: "column",
  minHeight: "80vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  // tamanhos
  gap: theme.spacing(2),
  paddingTop: theme.spacing(10),
  // cor de fundo
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
}));

const BoxText = styled(Box)(({ theme }) => ({
  flex: "1",
  paddingLeft: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    flex: "2",
    textAlign: "center",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));

const Page = () => {
  return (
    <>
      <Head>
        <title>Littlelives</title>
      </Head>
      <CustomBox component="header">
        {/*  Box text  */}
        <BoxText component="section">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#fff",
            }}
          >
            Welcome to our Workflow Creation Hub!
          </Typography>

          <Typography
            sx={{
              maxWidth: 1000,
              py: 3,
              lineHeight: 1.6,
              color: "#fff",
              textAlign: "center",
            }}
          >
            Embark on a journey where efficiency meets innovation. Join a community that values
            seamless processes and quality outcomes. Your trust is our foundation, and we are
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            excited to help you unlock the full potential of your workflows. Let's create, optimize,
            and succeed together
          </Typography>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{
                mr: 2,
                px: 4,
                py: 1,
                fontSize: "0.9rem",
                textTransform: "capitalize",
                borderRadius: 0,
                borderColor: "#14192d",
                color: "#fff",
                backgroundColor: "#14192d",
                "&&:hover": {
                  backgroundColor: "#343a55",
                },
                "&&:focus": {
                  backgroundColor: "#343a55",
                },
              }}
            >
              buy now
            </Button>
            <Button
              variant="outlined"
              sx={{
                px: 4,
                py: 1,
                fontSize: "0.9rem",
                textTransform: "capitalize",
                borderRadius: 0,
                color: "#fff",
                backgroundColor: "transparent",
                borderColor: "#fff",
                "&&:hover": {
                  color: "#343a55",
                  borderColor: "#343a55",
                },
                "&&:focus": {
                  color: "#343a55",
                  borderColor: "#343a55",
                },
              }}
            >
              explore
            </Button>
          </Box>
        </BoxText>

        <Box
          sx={(theme) => ({
            [theme.breakpoints.down("md")]: {
              flex: "1",
              paddingTop: "30px",
              alignSelf: "center",
            },
            [theme.breakpoints.up("md")]: {
              flex: "2",
            },
          })}
        >
          <Image
            src="/static/images/workflow-landing-page.jpg"
            alt="headerImg"
            width={1160}
            height={600}
          />
        </Box>
      </CustomBox>
      <Grid
        container
        spacing={{ xs: 4, sm: 4, md: 0 }}
        sx={{
          py: 10,
          px: 2,
        }}
      >
        <CustomGridItem item xs={12} sm={8} md={6}>
          <Box
            component="article"
            sx={{
              px: 4,
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: "700",
                textAlign: "start",
              }}
            >
              We make it easy for tenants and landlords
            </Typography>
            <CustomTypography>
              Listing are updated continuously so you
              <br />
              won &apos t miss out on homes that just hit
              <br />
              market until you find your perfect home.
            </CustomTypography>
          </Box>
        </CustomGridItem>

        <Grid item xs={12} sm={4} md={6}>
          <img
            src="https://hive.com/wp-content/uploads/2022/05/Workflow-software.png"
            alt=""
            style={{
              width: "100%",
            }}
          />
        </Grid>

        <Grid
          item
          xs={12}
          sm={4}
          md={6}
          sx={{
            order: { xs: 4, sm: 4, md: 3 },
          }}
        >
          <img
            src="https://blog.mindmanager.com/wp-content/uploads/2022/11/Background-1-1140x385.png"
            alt=""
            style={{
              width: "100%",
            }}
          />
        </Grid>

        <CustomGridItem
          item
          xs={12}
          sm={8}
          md={6}
          sx={{
            order: { xs: 3, sm: 3, md: 4 },
          }}
        >
          <Box
            component="article"
            sx={{
              px: 4,
            }}
          >
            <Typography
              variant="h4"
              component="h3"
              sx={{
                fontWeight: "700",
                textAlign: "start",
              }}
            >
              Match with the best agent
            </Typography>
            <CustomTypography>
              Our verified partner Agents are local experts who
              <br />
              earn an average of 4.8/5 stars from buyers and sellers.
            </CustomTypography>
          </Box>
        </CustomGridItem>
      </Grid>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <div style={{ width: "100vw", height: "100vh" }}></div>
      </Box>
    </>
  );
};

Page.getLayout = (page: JSX.Element) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
