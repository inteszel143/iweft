export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
};

export const formatDate = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  const options = { year: "numeric", month: "short", day: "numeric" };
  return date.toLocaleDateString("en-US", options as any);
};
export const formatTime = (unixTimestamp: number) => {
  const date = new Date(unixTimestamp * 1000);
  const options = { hour: "2-digit", minute: "2-digit", hour12: true }; // Change hour12 to true for 12-hour format
  return date.toLocaleTimeString("en-US", options as any);
};

export const getTotal = (
  base: string | number,
  totalItem: string | number
): string => {
  const baseNumber = typeof base === "string" ? parseFloat(base) : base;
  const totalItemNumber =
    typeof totalItem === "string" ? parseFloat(totalItem) : totalItem;
  const total = baseNumber + totalItemNumber;

  // Format the total number with commas
  return new Intl.NumberFormat().format(total);
};

export const getPromoDiscount = (
  base: string | number,
  totalItem: string | number,
  discount: string | number
): string => {
  const baseNumber = typeof base === "string" ? parseFloat(base) : base;
  const totalItemNumber =
    typeof totalItem === "string" ? parseFloat(totalItem) : totalItem;
  const discountNumber =
    typeof discount === "string" ? parseFloat(discount) : discount;
  const total = baseNumber + totalItemNumber;
  const discountedTotal = total * (discountNumber / 100);

  // Format the discounted total with commas
  return new Intl.NumberFormat().format(discountedTotal);
};

export const getDiscountedTotal = (
  base: string | number,
  totalItem: string | number,
  discount: string | number
): string => {
  const total: any = getTotal(base, totalItem);
  const promoDiscount: any = getPromoDiscount(base, totalItem, discount);
  const newTotal = total - promoDiscount;

  // Format the new total number with commas
  return new Intl.NumberFormat().format(newTotal);
};

export const messageTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();

  // Calculate the difference in days between the given date and the current date
  const dayDifference = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Check if the date is yesterday
  if (dayDifference === 1) {
    return "Yesterday";
  }

  // Check if the date is earlier than yesterday
  if (dayDifference > 1) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  }

  // Extract hours and minutes
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format hours and minutes to always have two digits
  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
};

export const ratingTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  const units = [
    { name: "year", seconds: 31536000 },
    { name: "month", seconds: 2592000 },
    { name: "week", seconds: 604800 },
    { name: "day", seconds: 86400 },
    { name: "hour", seconds: 3600 },
    { name: "minute", seconds: 60 },
    { name: "second", seconds: 1 },
  ];

  for (const unit of units) {
    const interval = Math.floor(diffInSeconds / unit.seconds);
    if (interval > 0) {
      if (interval === 1) {
        return `1 ${unit.name} ago`;
      } else {
        return `${interval} ${unit.name}s ago`;
      }
    }
  }

  return "Just now";
};

export const getAverageRating = (dataArray: any): number => {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return 0;
  }

  const totalRating = dataArray?.reduce((total: any, item: any) => {
    // Ensure the rating is within the valid range
    if (item.rating >= 0 && item.rating <= 5) {
      return total + item.rating;
    } else {
      return total;
    }
  }, 0);

  // Count the number of valid ratings
  const validRatingsCount = dataArray.reduce((count: any, item: any) => {
    if (item.rating >= 0 && item.rating <= 5) {
      return count + 1;
    } else {
      return count;
    }
  }, 0);

  // Calculate the average rating
  return validRatingsCount > 0 ? totalRating / validRatingsCount : 0;
};
