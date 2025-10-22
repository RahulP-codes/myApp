import React, { useEffect, useRef, useState } from "react";
import PagerView from "react-native-pager-view";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
  ImageBackground,
  Linking,
} from "react-native";
import { Shadow } from "react-native-shadow-2";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";
import { Platform } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  List,
  Modal,
  Portal,
  RadioButton,
} from "react-native-paper";
import { Event, Highlight } from "../../components/home";
import { useEvent } from "../../hooks/query/events-query";
import { useEventStore } from "../../store/events-store";
import { filterData } from "../../utils/helper";
import { useProfileStore } from "../../store/profile-store";
import { IEventData } from "@/types/api/events.types";

export default function HomeScreen() {
  const { data: EventData, isLoading, refetch } = useEvent();
  const name = useProfileStore((state) => state.name);
  const isguest = useProfileStore((state) => state.isGuest);

  const [visible, setVisible] = useState(false);
  const hideModal = () => setVisible(false);
  const showModal = () => setVisible(true);

  const [categories, setCategories] = useState<string[]>([]);
  const [days, setDays] = useState<string[]>([]);
  const [venues, setVenues] = useState<string[]>([]);

  const [filterCategory, setFilterCategory] = useState("");
  const [filterDay, setFilterDay] = useState<string[]>(["1", "2"]);
  const [filterVenue, setFilterVenue] = useState("");

  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const highlights = EventData?.data?.highlights;

  const onGoingEvents = useEventStore((state) => state.onGoing);
  const upcommingEvents = useEventStore((state) => state.upcoming);
  const completedEvents = useEventStore((state) => state.completed);
  const setOnGoingEvents = useEventStore((state) => state.setOnGoing);
  const setUpcommingEvents = useEventStore((state) => state.setUpcoming);
  const setCompletedEvents = useEventStore((state) => state.setCompleted);

  const togglefilter = (filtername: string) => {
    if (filterCategory === filtername) {
      setFilterCategory("");
    } else {
      setFilterCategory(filtername);
    }
  };

  useEffect(() => {
    const timeNow = new Date();
    EventData?.data?.other.forEach((item) => {
      if (!categories.includes(item.category)) {
        setCategories([...categories, item.category]);
      }
      if (!days.includes(item.day)) {
        setDays([...days, item.day]);
      }
      if (!venues.includes(item.venue.name)) {
        setVenues([...venues, item.venue.name]);
      }

      if (
        new Date(item.startTime) < timeNow &&
        new Date(item.endTime) > timeNow
      ) {
        setOnGoingEvents(item);
      } else if (new Date(item.startTime) > timeNow) {
        setUpcommingEvents(item);
      } else if (new Date(item.endTime) < timeNow) {
        setCompletedEvents(item);
      }
    });

    EventData?.data?.highlights.forEach((item) => {
      if (!categories.includes(item.category)) {
        setCategories([...categories, item.category]);
      }
      if (!days.includes(item.day)) {
        setDays([...days, item.day]);
      }
      if (!venues.includes(item.venue.name)) {
        setVenues([...venues, item.venue.name]);
      }
    });
  }, [EventData]);

  const handleResetModal = async () => {
    setFilterCategory("");
    setFilterDay(["1", "2"]);
    setFilterVenue("");
  };

  useEffect(() => {
    if (!highlights?.length) return;

    const autoSlideInterval = setInterval(() => {
      const nextPage = (currentPage + 1) % highlights.length;
      setCurrentPage(nextPage);
      pagerRef.current?.setPage(nextPage);
    }, 3000);

    return () => clearInterval(autoSlideInterval);
  }, [currentPage, highlights]);

  return (
    <View style={styles.container}>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.containerStyle}
        >
          <ScrollView>
            <List.Accordion
              title="Categories"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
            >
              <View>
                <RadioButton.Group
                  onValueChange={(newValue) => setFilterCategory(newValue)}
                  value={filterCategory}
                >
                  {categories.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          if (filterCategory === item) {
                            setFilterCategory("");
                          } else {
                            setFilterCategory(item);
                          }
                        }}
                      >
                        <View style={styles.itemList}>
                          <RadioButton value={item} />
                          <Text style={styles.itemText}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </RadioButton.Group>
              </View>
            </List.Accordion>

            <Divider style={styles.divider} />

            <List.Accordion
              title="Venue"
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
            >
              <View>
                <RadioButton.Group
                  onValueChange={(newValue) => setFilterVenue(newValue)}
                  value={filterVenue}
                >
                  {venues.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          if (filterVenue === item) {
                            setFilterVenue("");
                          } else {
                            setFilterVenue(item);
                          }
                        }}
                      >
                        <View style={styles.itemList}>
                          <RadioButton value={item} />
                          <Text style={styles.itemText}>{item}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </RadioButton.Group>
              </View>
            </List.Accordion>
          </ScrollView>
          <View style={styles.modalFooter}>
            <Button mode="contained" onPress={handleResetModal}>
              Reset
            </Button>
            <Button mode="contained" onPress={hideModal}>
              Done
            </Button>
          </View>
        </Modal>
      </Portal>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        {isLoading ? (
          <ActivityIndicator
            animating={true}
            color="#FFE600"
            size="large"
            style={{ marginTop: 20 }}
          />
        ) : (
          <>
            {isguest ? (
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL("https://ecell.in/esummit/register");
                }}
              >
                <View
                  style={[
                    styles.section,
                    {
                      backgroundColor: "red",
                      padding: 25,
                      paddingBottom: 7,
                    },
                  ]}
                >
                  <Text style={{ color: "#fff", fontFamily: "Proxima" }}>
                    You are Signed in as guest user
                  </Text>
                  <Text style={{ color: "#fff", fontFamily: "Proxima" }}>
                    Register Now and Relogin to get entry in E-Summit
                  </Text>
                  <Text
                    style={{
                      color: "#fff",
                      fontSize: 20,
                      fontFamily: "ProximaBold",
                    }}
                  >
                    Click here!
                  </Text>
                </View>
              </TouchableOpacity>
            ) : null}

            <View style={styles.section}>
              <Text style={styles.heading}>HIGHLIGHT SESSIONS</Text>

              <PagerView
                style={styles.highlightScroll}
                initialPage={0}
                pageMargin={-20}
                onPageSelected={(event) =>
                  setCurrentPage(event.nativeEvent.position)
                }
                ref={pagerRef}
              >
                {EventData?.data?.highlights.map((item, index) => (
                  <View
                    key={index}
                    style={{
                      paddingHorizontal: 11,
                    }}
                  >
                    <Highlight
                      url={item.image}
                      alt={item.name}
                      id={item.id}
                      index={index}
                      length={EventData?.data.highlights.length}
                      venue={item.venue.name}
                      day={item.day}
                      startTime={item.startTime}
                      isLive={
                        new Date(item.startTime) < new Date() &&
                        new Date(item.endTime) > new Date()
                      }
                      navigation={{
                        navigate: (screen: string, params: any) =>
                          router.push(
                            `/${screen.toLowerCase()}?id=${params.id}` as any
                          ),
                      }}
                    />
                  </View>
                ))}
              </PagerView>
            </View>

            <View style={styles.headcont2}>
              <Button
                style={[
                  styles.daybutton,
                  {
                    backgroundColor:
                      filterDay.length === 2
                        ? "#FFE600"
                        : "hsla(0, 0.00%, 100.00%, 0.05)",
                  },
                ]}
                onPress={() => setFilterDay(["1", "2"])}
              >
                <Text
                  style={[
                    styles.daybuttonText,
                    { color: filterDay.length === 2 ? "black" : "white" },
                  ]}
                >
                  ALL
                </Text>
              </Button>
              <Button
                style={[
                  styles.daybutton,
                  {
                    backgroundColor:
                      filterDay.includes("1") && filterDay.length === 1
                        ? "#FFE600"
                        : "hsla(0, 0.00%, 100.00%, 0.05)",
                  },
                ]}
                onPress={() => setFilterDay(["1"])}
              >
                <Text
                  style={[
                    styles.daybuttonText,
                    {
                      color:
                        filterDay.includes("1") && filterDay.length === 1
                          ? "black"
                          : "white",
                    },
                  ]}
                >
                  DAY 1
                </Text>
              </Button>
              <Button
                style={[
                  styles.daybutton,
                  {
                    backgroundColor:
                      filterDay.includes("2") && filterDay.length === 1
                        ? "#FFE600"
                        : "hsla(0, 0.00%, 100.00%, 0.05)",
                  },
                ]}
                onPress={() => setFilterDay(["2"])}
              >
                <Text
                  style={[
                    styles.daybuttonText,
                    {
                      color:
                        filterDay.includes("2") && filterDay.length === 1
                          ? "black"
                          : "white",
                    },
                  ]}
                >
                  DAY 2
                </Text>
              </Button>
            </View>

            <View style={styles.iconsContainer}>
              <TouchableOpacity
                onPress={() => togglefilter("oat")}
                style={filterCategory === "oat" ? styles.icon2 : styles.icon}
              >
                <Text
                  style={
                    filterCategory === "oat"
                      ? styles.iconText2
                      : styles.iconText
                  }
                >
                  OAT Event
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => togglefilter("ltpcsa")}
                style={filterCategory === "ltpcsa" ? styles.icon2 : styles.icon}
              >
                <Text
                  style={
                    filterCategory === "ltpcsa"
                      ? styles.iconText2
                      : styles.iconText
                  }
                >
                  LT-PCSA
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => togglefilter("lhc")}
                style={filterCategory === "lhc" ? styles.icon2 : styles.icon}
              >
                <Text
                  style={
                    filterCategory === "lhc"
                      ? styles.iconText2
                      : styles.iconText
                  }
                >
                  LHC Sessions
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => togglefilter("convo")}
                style={filterCategory === "convo" ? styles.icon2 : styles.icon}
              >
                <Text
                  style={
                    filterCategory === "convo"
                      ? styles.iconText2
                      : styles.iconText
                  }
                >
                  Convocation Hall
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => togglefilter("startup events")}
                style={
                  filterCategory === "startup events"
                    ? styles.icon2
                    : styles.icon
                }
              >
                <Text
                  style={
                    filterCategory === "startup events"
                      ? styles.iconText2
                      : styles.iconText
                  }
                >
                  Startup Events
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => togglefilter("student events")}
                style={
                  filterCategory === "student events"
                    ? styles.icon2
                    : styles.icon
                }
              >
                <Text
                  style={
                    filterCategory === "student events"
                      ? styles.iconText2
                      : styles.iconText
                  }
                >
                  Student Events
                </Text>
              </TouchableOpacity>
            </View>

            {onGoingEvents.length > 0 && (
              <View style={styles.section}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={[styles.heading, { alignSelf: "center" }]}>
                    ONGOING EVENTS
                  </Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.events}>
                    {filterData(
                      onGoingEvents,
                      filterCategory,
                      filterDay,
                      filterVenue
                    ).map((item: IEventData, index: number) => (
                      <Event
                        key={index}
                        id={item.id}
                        url={item.image}
                        event={item.name}
                        description={item.description}
                        venue={item.venue.name}
                        latitude={item.venue.latitude}
                        longitude={item.venue.longitude}
                        startTime={
                          typeof item.startTime === "string"
                            ? new Date(item.startTime)
                            : item.startTime
                        }
                        endTime={
                          typeof item.endTime === "string"
                            ? new Date(item.endTime)
                            : item.endTime
                        }
                        tag="ongoing"
                        navigation={{
                          navigate: (screen: string, params: any) =>
                            router.push(
                              `/${screen.toLowerCase()}?id=${params.id}` as any
                            ),
                        }}
                      />
                    ))}
                  </View>
                </View>
              </View>
            )}

            {upcommingEvents.length > 0 && (
              <View style={styles.section}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.heading}>UPCOMING EVENTS</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.events}>
                    {filterData(
                      upcommingEvents,
                      filterCategory,
                      filterDay,
                      filterVenue
                    ).map((item: IEventData, index: number) => (
                      <Event
                        key={index}
                        id={item.id}
                        url={item.image}
                        event={item.name}
                        description={item.description}
                        venue={item.venue.name}
                        latitude={item.venue.latitude}
                        longitude={item.venue.longitude}
                        startTime={
                          typeof item.startTime === "string"
                            ? new Date(item.startTime)
                            : item.startTime
                        }
                        endTime={
                          typeof item.endTime === "string"
                            ? new Date(item.endTime)
                            : item.endTime
                        }
                        tag="ongoing"
                        navigation={{
                          navigate: (screen: string, params: any) =>
                            router.push(
                              `/${screen.toLowerCase()}?id=${params.id}` as any
                            ),
                        }}
                      />
                    ))}
                  </View>
                </View>
              </View>
            )}

            {completedEvents.length > 0 && (
              <View style={styles.eventsCont}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.heading}>COMPLETED EVENTS</Text>
                </View>
                <View style={{ alignItems: "center" }}>
                  <View style={styles.events}>
                    {filterData(
                      completedEvents,
                      filterCategory,
                      filterDay,
                      filterVenue
                    ).map((item: IEventData, index: number) => (
                      <Event
                        key={index}
                        id={item.id}
                        url={item.image}
                        event={item.name}
                        description={item.description}
                        venue={item.venue.name}
                        latitude={item.venue.latitude}
                        longitude={item.venue.longitude}
                        startTime={
                          typeof item.startTime === "string"
                            ? new Date(item.startTime)
                            : item.startTime
                        }
                        endTime={
                          typeof item.endTime === "string"
                            ? new Date(item.endTime)
                            : item.endTime
                        }
                        tag="ongoing"
                        navigation={{
                          navigate: (screen: string, params: any) =>
                            router.push(
                              `/${screen.toLowerCase()}?id=${params.id}` as any
                            ),
                        }}
                      />
                    ))}
                  </View>
                </View>
              </View>
            )}
            <View style={{ marginBottom: 100 }}></View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },

  scrollView: {
    flex: 1,
  },

  headcont2: {
    alignSelf: "flex-start",
    flexDirection: "row",
    marginVertical: 10,
    marginLeft: -1,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "hsla(0, 0.00%, 100.00%, 0.1)",
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
  },
  daybutton: {
    // backgroundColor: "#382ad3",
    // color: "#ffffff",
    width: 70,
    marginHorizontal: 5,
  },
  daybuttonText: {
    fontFamily: "ProximaBold",
  },
  containerStyle: {
    backgroundColor: "#BBD4E2",
    width: "70%",
    alignSelf: "center",
    padding: 10,
    borderRadius: 10,
    maxHeight: Dimensions.get("window").width,
  },
  section: {
    // backgroundColor: "transparent",
    marginVertical: 3,
    // paddingHorizontal: 10,
  },
  heading: {
    fontFamily: "ProximaExtraBold",
    fontSize: 20,
    fontWeight: "normal",
    letterSpacing: 0.8,
    lineHeight: 24,
    color: "#FFFFFF",
    margin: 15,
    marginBottom: 0,
  },
  highlightScroll: {
    height: 200,
    // backgroundColor: "white",
  },
  eventsCont: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.05)",
    borderRadius: 25,
    overflow: "hidden",
    marginBottom: 80,
  },
  events: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10,
    justifyContent: "center",
  },
  itemList: {
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "grey",
  },
  accordion: {
    backgroundColor: "#DCE9F0",
  },
  accordionTitle: {
    fontSize: 16,
    textTransform: "uppercase",
    color: "#141415",
  },
  divider: {
    height: 3,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingRight: 10,
    paddingTop: 10,
  },
  itemText: {
    fontSize: 14,
    textTransform: "uppercase",
  },
  iconsContainer: {
    margin: 3,
    paddingHorizontal: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    margin: 5,
    padding: 5,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "hsla(0, 0.00%, 100.00%, 0.07)",
    aspectRatio: 2,
  },
  icon2: {
    margin: 5,
    padding: 5,
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE600",
    borderRadius: 12,
    aspectRatio: 2,
    color: "black",
  },
  iconText: {
    color: "#ffffff",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
    fontFamily: "Proxima",
  },
  iconText2: {
    color: "#000000",
    fontSize: 12,
    marginTop: 2,
    textAlign: "center",
    fontFamily: "Proxima",
  },
});
