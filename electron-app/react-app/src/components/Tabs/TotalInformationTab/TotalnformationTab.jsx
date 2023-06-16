import { Flex, Stack, TabPanel, Text } from "@chakra-ui/react";

import useRedmineStore from "../../../store/redmineStore";

import { getHours, getTotalHours, round } from "../../../helpers/getHours";
import getProjectName from "../../../helpers/getProjectName";

import RedmineForm from "./RedmineForm";

const getUniqueProjectIds = (dataItem) => {
  const uniqueProjectIds = new Set();

  for (const log of dataItem) {
    const { project } = log;
    if (project !== "") {
      uniqueProjectIds.add(project);
    } else {
      uniqueProjectIds.add("undefined project");
    }
  }

  return Array.from(uniqueProjectIds);
};

const subLinkStyles = {
  borderBottom: "1px solid",
  borderColor: "gray",
  lineHeight: 1,
  py: 4,
  textAlign: "center",
  fontWeight: 500,
};

const mainLinkStyles = {
  lineHeight: 1,
  py: 4,
  fontWeight: 700,
  borderBottom: "1px solid",
  borderColor: "gray",
};

const TotalInformationTab = ({ data }) => {
  const { projects } = useRedmineStore();

  const totalPeriodHours = getTotalHours(data);

  return (
    <TabPanel px={0} mr="40px">
      <Stack>
        <Flex>
          <Stack
            justifyContent="center"
            gap={0}
            minW="120px"
            alignSelf="stretch"
            width="100%"
          >
            <Text h="100%" {...mainLinkStyles}>
              Project:
            </Text>
            <Text {...mainLinkStyles}>NBLB:</Text>
            <Text {...mainLinkStyles}>BLB:</Text>
            <Text {...mainLinkStyles}>Total by date:</Text>
            <Text lineHeight={1} py={4} fontWeight={700}>
              Total by period:
            </Text>
          </Stack>
          {data.map(([_, logs], index) => {
            const { nblbHours, blbHours, totalHours } = getHours(logs);
            const totalTextColor = totalHours !== 8 ? "tomato" : "green";
            const isLastItem = index === data.length - 1;
            const projectsByDay = getUniqueProjectIds(logs);

            return (
              <Stack
                justifyContent="center"
                key={index}
                gap={0}
                minW="81px"
                w="100%"
                alignSelf="stretch"
              >
                <Stack
                  justifyContent="center"
                  borderBottom="1px solid"
                  borderColor="gray"
                  gap={0}
                  minW="80px"
                  h="100%"
                >
                  {projectsByDay.length ? (
                    projectsByDay.map((item, index) => (
                      <Text
                        key={index}
                        textAlign="center"
                        fontWeight={500}
                        fontSize="xs"
                        p="15px 7px"
                        h="100%"
                      >
                        {item === "undefined project"
                          ? item
                          : getProjectName(item, projects)}
                      </Text>
                    ))
                  ) : (
                    <Text
                      color="tomato"
                      lineHeight={1}
                      py={4}
                      textAlign="center"
                      fontWeight={500}
                    >
                      Empty
                    </Text>
                  )}
                </Stack>
                <Text {...subLinkStyles}>{nblbHours}</Text>
                <Text {...subLinkStyles}>{blbHours}</Text>
                <Text
                  {...subLinkStyles}
                  fontWeight={600}
                  color={totalTextColor}
                >
                  {round(totalHours)}
                </Text>
                <Text lineHeight={1} py={4} textAlign="center" fontWeight={700}>
                  {isLastItem ? round(totalPeriodHours) : "ㅤ"}
                </Text>
                )
              </Stack>
            );
          })}
        </Flex>

        <RedmineForm />
      </Stack>
    </TabPanel>
  );
};

export default TotalInformationTab;
