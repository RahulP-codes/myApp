import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ActivityIndicator, Divider, List } from 'react-native-paper';
import { useFaq } from '../../hooks/query/other-query';

export const Faq = () => {
  const { data: FaqData, isLoading } = useFaq();

  return (
    <View style={styles.content}>
      <Text style={styles.title}>FAQs</Text>
      <Divider style={styles.divider} />
      {isLoading ? (
        <ActivityIndicator animating={true} color="#4E8FB4" size="small" style={{ marginTop: 20 }} />
      ) : (
        FaqData?.data.map((faq, index) => (
          <View key={index}>
            <List.Accordion
              title={faq.question}
              style={styles.accordion}
              titleStyle={styles.accordionTitle}
              titleNumberOfLines={3}
              id={index}
              theme={{ colors: { background: 'transparent' } }}
              right={props => (
                <List.Icon icon={props.isExpanded ? 'chevron-up' : 'chevron-down'} color="#FFFFFF" />
              )}
            >
              <View style={styles.accordionAnswer}>
                <Text style={styles.accordionAnswersText}>{faq.answer}</Text>
              </View>
            </List.Accordion>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: '100%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  title: {
    fontFamily: 'ProximaExtraBold',
    fontSize: 36,
    color: '#FFFFFF',
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  accordion: {},
  accordionTitle: {
    color: '#FFFFFF',
    fontFamily: 'ProximaBold',
    fontSize: 16,
    lineHeight: 18,
    textTransform: 'uppercase',
  },
  accordionAnswer: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
  },
  accordionAnswersText: {
    fontSize: 12,
    lineHeight: 15,
    paddingVertical: 9,
    paddingHorizontal: 22,
    color: '#D3D3D3',
    textAlign: 'justify',
  },
  divider: {
    marginTop: 5,
    height: 1,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'hsla(0, 0.00%, 100.00%, 0.05)',
  },
});
