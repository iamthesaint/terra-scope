export const getDefaultCategories = async () => {
    // mock data for default categories
    return [
      {
        category: 'Tropical Getaways',
        locations: ['Maldives', 'Hawaii', 'Bahamas'],
      },
      {
        category: 'Winter Retreats',
        locations: ['Aspen', 'Swiss Alps', 'Reykjavik'],
      },
      {
        category: 'Adventure Spots',
        locations: ['Grand Canyon', 'Costa Rica', 'New Zealand'],
      },
      {
        category: 'Cultural Destinations',
        locations: ['Kyoto', 'Paris', 'Rome'],
      },
    ];
  };
  