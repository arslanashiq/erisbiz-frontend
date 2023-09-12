import React, { useEffect, useState, Children } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router';

function SidebarCategory(props) {
  const { title, icon, isNew, children, isOpen } = props;
  const location = useLocation();
  const [state, setState] = useState({
    collapse: isOpen,
  });
  const toggle = () => {
    setState(prevState => ({ ...prevState, collapse: !prevState.collapse }));
  };

  const handleCollapse = () => {
    let hasActiveChild = false;
    Children.toArray(children)
      .filter(Boolean)
      .forEach(item => {
        // Check if any of its child' route matches
        if (location.pathname.includes(item.props.route)) {
          hasActiveChild = true;
          // If not its child then go for its subchild
        } else if (item.props.children) {
          const temp = handleCollapse();
          // If any of subchild is active just in then case set TRUE
          if (temp) hasActiveChild = true;
        }
      });
    return hasActiveChild;
  };

  const iterateChildren = () => {
    Children.toArray(children)
      .filter(Boolean)
      .forEach(item => {
        if (item.props.children) {
          iterateChildren();
        } else if (location.pathname.includes(item.props.route)) {
          setState({ ...state, collapse: true });
        }
      });
  };
  useEffect(() => {
    iterateChildren();
  }, []);

  useEffect(() => {
    setState({ ...state, collapse: handleCollapse() });
  }, [location]);

  return (
    <div
      className={
        state.collapse ? 'sidebar__category-wrap sidebar__category-wrap--open' : 'sidebar__category-wrap'
      }
    >
      <button type="button" className="sidebar__link sidebar__category" onClick={toggle}>
        {icon ? <span className={`sidebar__link-icon fas fa-${icon}`} /> : ''}
        <p className="sidebar__link-title">
          {title}
          {isNew && <span className="sidebar__category-new" />}
        </p>
        <span className="sidebar__category-icon lnr lnr-chevron-right" />
      </button>
      <ul className="sidebar__submenu">
        <div>{children}</div>
      </ul>
      \
    </div>
  );
}

SidebarCategory.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  isNew: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
  isOpen: PropTypes.bool,
};
SidebarCategory.defaultProps = {
  icon: '',
  isNew: false,
  isOpen: false,
};
export default SidebarCategory;
