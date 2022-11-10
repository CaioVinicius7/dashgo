import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false
});

import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";

const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      "2022-11-10t00:00:00.00z",
      "2022-11-11t00:00:00.00z",
      "2022-11-12t00:00:00.00z",
      "2022-11-13t00:00:00.00z",
      "2022-11-14t00:00:00.00z",
      "2022-11-15t00:00:00.00z",
      "2022-11-16t00:00:00.00z"
    ]
  },
  fill: {
    opacity: 0.3,
    type: "gradient",
    gradient: {
      shade: "dark",
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
};

const series = [
  {
    name: "Series1",
    data: [31, 120, 10, 28, 51, 18, 109]
  }
];

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Header />
      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />

        <SimpleGrid flex="1" gap="4" minChildWidth="320px">
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Inscritos da semana
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>

          <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
            <Text fontSize="lg" mb="4">
              Taxa de abertura
            </Text>
            <Chart options={options} series={series} type="area" height={160} />
          </Box>
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}
