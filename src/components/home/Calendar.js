import React from "react";
import { CalendarList } from "react-native-calendars";
import { Text, View, StyleSheet } from "react-native";
import { getYYYYMMDD } from "../../utils/date";
import { tags } from "../../utils/tags";
import useSWR from "swr";

const Calendar = () => {
  const { data } = useSWR(`/moods?_limit=100`);
  const items = (data && data.items) || [];
  let markedDates = {};
  items.map((i) => {
    let tag = tags.VeryUnhappy;
    if (i.tags && i.tags.length > 0) {
      tag = tags[i.tags[0]];
    }
    markedDates[getYYYYMMDD(i._metadata.created)] = {
      customStyles: {
        container: {
          backgroundColor: tag.color + "22",
          borderColor: tag.color,
          borderWidth: 1,
          borderRadius: 10,
        },
      },
    };
  });
  return (
    <CalendarList
      current={"2020-06-10"}
      pastScrollRange={24}
      futureScrollRange={24}
      markedDates={markedDates}
      markingType={"custom"}
      renderHeader={(date) => {
        const header = date.toString("MMMM yyyy");
        const [month, year] = header.split(" ");

        return (
          <View style={styles.renderDate}>
            <Text style={styles.renderDateText}>{`${month}, ${year}`}</Text>
          </View>
        );
      }}
      theme={{
        "stylesheet.calendar.header": {
          dayHeader: {
            fontWeight: "600",
          },
        },
        "stylesheet.day.basic": {
          today: {
            borderColor: "#48BFE3",
            borderWidth: 0.8,
          },
          todayText: {
            color: "#5390D9",
            fontWeight: "800",
          },
        },
      }}
    />
  );
};

const styles = StyleSheet.create({
  renderDate: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
  },
  renderDateText: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 5,
    marginLeft: 5,
  },
  list: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 3,
    paddingHorizontal: 15,
  },
});

export default Calendar;
