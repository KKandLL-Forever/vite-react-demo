import React from 'react';

const useSlot = (children) => {
  /**
   * map slots
   */
  const slots = React.Children.toArray(children)
    .reduce((result, child) => {
      if (child.props && child.props.slot) {
        result[child.props.slot] = child;
      } else {
        result.default.push(child);
      }
      
      return result;
    }, { default: [] });
  // console.log(children)
  // console.log(slots,'slots')
  
  /**
   * slot component
   */
  const Slot = ({ name, children: slotChildren }) => {
    if (!name) {
      return slots.default.length ? slots.default : (slotChildren || null);
    }
    return slots[name] || slotChildren || null;
  };
  
  return Slot;
};

export default useSlot
