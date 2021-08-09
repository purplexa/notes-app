import React from 'react';
import { Fab, makeStyles, Tab, Tabs, Theme } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Category, selectCategories } from './notesSlice';

function a11yTabProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    //height: 224,
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    flexShrink: 0,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

interface Params {
  category_id: string,
}

const TabbedPage: React.FC = ({ children }) => {
  const classes = useStyles();
  const categories = useSelector(selectCategories);
  const { category_id } = useParams<Params>();

  return (
    <div>
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          aria-label="Categories list"
          className={classes.tabs}
          value={category_id || "create"}
        >
          {Object.entries(categories).map((entry: [string, Category]) =>
            <Tab key={entry[0]} label={entry[1].name} component={Link} to={`/category/${entry[0]}`} value={entry[0]} {...a11yTabProps(entry[0])} />
          )}
          <Tab label="Add Category" component={Link} to="/category/create" value="create" />
        </Tabs>
        <div>
          {children}
        </div>
        {/* <div className={classes.content}>
          <Note
            title="Lorem Ipsum"
            date={date}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lorem ex, cursus nec posuere eget, eleifend in justo. Phasellus vehicula ligula sit amet est imperdiet interdum. In hac habitasse platea dictumst. Nullam convallis arcu enim, bibendum condimentum libero varius sed. Donec dictum tellus mi, nec bibendum dolor vulputate auctor. Nullam at lacinia dolor. Donec sed est velit. Nullam sed maximus risus. Suspendisse eu viverra enim. Etiam quam nulla, ultrices sit amet diam in, porta gravida dolor. Ut vitae lacinia lacus. Vivamus vitae ipsum vitae enim tempus tristique eu imperdiet nunc. Sed enim odio, viverra scelerisque suscipit ac, facilisis et arcu. Praesent non augue augue. Mauris fringilla turpis odio, eu porta ligula varius ac. Praesent in ante scelerisque tellus molestie suscipit.

            Nulla eros arcu, condimentum ac venenatis non, aliquet sagittis libero. Sed iaculis dolor quam, non ultrices erat mattis eget. Curabitur tincidunt eleifend nunc, at molestie ligula molestie eleifend. Pellentesque sagittis vehicula odio sit amet pellentesque. Suspendisse varius eros quis ex mollis viverra. Cras accumsan interdum urna. Praesent sollicitudin porta tortor ac vehicula.

            Suspendisse luctus ipsum id est lobortis, in accumsan metus dignissim. Suspendisse euismod ullamcorper dui. Donec egestas, ipsum non elementum facilisis, purus nisl ornare nisi, sit amet auctor felis nisi vitae dolor. Vivamus faucibus sagittis lorem sit amet facilisis. Vestibulum ultrices vestibulum lectus. Suspendisse condimentum nec purus et molestie. Sed congue egestas nisl non laoreet. Sed eleifend commodo mi quis sagittis. Vestibulum volutpat sed urna ac aliquet.
          </Note>
          <Note
            title="Lorem Ipsum"
            date={date}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lorem ex, cursus nec posuere eget, eleifend in justo. Phasellus vehicula ligula sit amet est imperdiet interdum. In hac habitasse platea dictumst. Nullam convallis arcu enim, bibendum condimentum libero varius sed. Donec dictum tellus mi, nec bibendum dolor vulputate auctor. Nullam at lacinia dolor. Donec sed est velit. Nullam sed maximus risus. Suspendisse eu viverra enim. Etiam quam nulla, ultrices sit amet diam in, porta gravida dolor. Ut vitae lacinia lacus. Vivamus vitae ipsum vitae enim tempus tristique eu imperdiet nunc. Sed enim odio, viverra scelerisque suscipit ac, facilisis et arcu. Praesent non augue augue. Mauris fringilla turpis odio, eu porta ligula varius ac. Praesent in ante scelerisque tellus molestie suscipit.

            Nulla eros arcu, condimentum ac venenatis non, aliquet sagittis libero. Sed iaculis dolor quam, non ultrices erat mattis eget. Curabitur tincidunt eleifend nunc, at molestie ligula molestie eleifend. Pellentesque sagittis vehicula odio sit amet pellentesque. Suspendisse varius eros quis ex mollis viverra. Cras accumsan interdum urna. Praesent sollicitudin porta tortor ac vehicula.

            Suspendisse luctus ipsum id est lobortis, in accumsan metus dignissim. Suspendisse euismod ullamcorper dui. Donec egestas, ipsum non elementum facilisis, purus nisl ornare nisi, sit amet auctor felis nisi vitae dolor. Vivamus faucibus sagittis lorem sit amet facilisis. Vestibulum ultrices vestibulum lectus. Suspendisse condimentum nec purus et molestie. Sed congue egestas nisl non laoreet. Sed eleifend commodo mi quis sagittis. Vestibulum volutpat sed urna ac aliquet.
          </Note>
          <Note
            title="Lorem Ipsum"
            date={date}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lorem ex, cursus nec posuere eget, eleifend in justo. Phasellus vehicula ligula sit amet est imperdiet interdum. In hac habitasse platea dictumst. Nullam convallis arcu enim, bibendum condimentum libero varius sed. Donec dictum tellus mi, nec bibendum dolor vulputate auctor. Nullam at lacinia dolor. Donec sed est velit. Nullam sed maximus risus. Suspendisse eu viverra enim. Etiam quam nulla, ultrices sit amet diam in, porta gravida dolor. Ut vitae lacinia lacus. Vivamus vitae ipsum vitae enim tempus tristique eu imperdiet nunc. Sed enim odio, viverra scelerisque suscipit ac, facilisis et arcu. Praesent non augue augue. Mauris fringilla turpis odio, eu porta ligula varius ac. Praesent in ante scelerisque tellus molestie suscipit.

            Nulla eros arcu, condimentum ac venenatis non, aliquet sagittis libero. Sed iaculis dolor quam, non ultrices erat mattis eget. Curabitur tincidunt eleifend nunc, at molestie ligula molestie eleifend. Pellentesque sagittis vehicula odio sit amet pellentesque. Suspendisse varius eros quis ex mollis viverra. Cras accumsan interdum urna. Praesent sollicitudin porta tortor ac vehicula.

            Suspendisse luctus ipsum id est lobortis, in accumsan metus dignissim. Suspendisse euismod ullamcorper dui. Donec egestas, ipsum non elementum facilisis, purus nisl ornare nisi, sit amet auctor felis nisi vitae dolor. Vivamus faucibus sagittis lorem sit amet facilisis. Vestibulum ultrices vestibulum lectus. Suspendisse condimentum nec purus et molestie. Sed congue egestas nisl non laoreet. Sed eleifend commodo mi quis sagittis. Vestibulum volutpat sed urna ac aliquet.
          </Note>
          <Note
            title="Lorem Ipsum"
            date={date}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lorem ex, cursus nec posuere eget, eleifend in justo. Phasellus vehicula ligula sit amet est imperdiet interdum. In hac habitasse platea dictumst. Nullam convallis arcu enim, bibendum condimentum libero varius sed. Donec dictum tellus mi, nec bibendum dolor vulputate auctor. Nullam at lacinia dolor. Donec sed est velit. Nullam sed maximus risus. Suspendisse eu viverra enim. Etiam quam nulla, ultrices sit amet diam in, porta gravida dolor. Ut vitae lacinia lacus. Vivamus vitae ipsum vitae enim tempus tristique eu imperdiet nunc. Sed enim odio, viverra scelerisque suscipit ac, facilisis et arcu. Praesent non augue augue. Mauris fringilla turpis odio, eu porta ligula varius ac. Praesent in ante scelerisque tellus molestie suscipit.

            Nulla eros arcu, condimentum ac venenatis non, aliquet sagittis libero. Sed iaculis dolor quam, non ultrices erat mattis eget. Curabitur tincidunt eleifend nunc, at molestie ligula molestie eleifend. Pellentesque sagittis vehicula odio sit amet pellentesque. Suspendisse varius eros quis ex mollis viverra. Cras accumsan interdum urna. Praesent sollicitudin porta tortor ac vehicula.

            Suspendisse luctus ipsum id est lobortis, in accumsan metus dignissim. Suspendisse euismod ullamcorper dui. Donec egestas, ipsum non elementum facilisis, purus nisl ornare nisi, sit amet auctor felis nisi vitae dolor. Vivamus faucibus sagittis lorem sit amet facilisis. Vestibulum ultrices vestibulum lectus. Suspendisse condimentum nec purus et molestie. Sed congue egestas nisl non laoreet. Sed eleifend commodo mi quis sagittis. Vestibulum volutpat sed urna ac aliquet.
          </Note>
          <Note
            title="Lorem Ipsum"
            date={date}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam lorem ex, cursus nec posuere eget, eleifend in justo. Phasellus vehicula ligula sit amet est imperdiet interdum. In hac habitasse platea dictumst. Nullam convallis arcu enim, bibendum condimentum libero varius sed. Donec dictum tellus mi, nec bibendum dolor vulputate auctor. Nullam at lacinia dolor. Donec sed est velit. Nullam sed maximus risus. Suspendisse eu viverra enim. Etiam quam nulla, ultrices sit amet diam in, porta gravida dolor. Ut vitae lacinia lacus. Vivamus vitae ipsum vitae enim tempus tristique eu imperdiet nunc. Sed enim odio, viverra scelerisque suscipit ac, facilisis et arcu. Praesent non augue augue. Mauris fringilla turpis odio, eu porta ligula varius ac. Praesent in ante scelerisque tellus molestie suscipit.

            Nulla eros arcu, condimentum ac venenatis non, aliquet sagittis libero. Sed iaculis dolor quam, non ultrices erat mattis eget. Curabitur tincidunt eleifend nunc, at molestie ligula molestie eleifend. Pellentesque sagittis vehicula odio sit amet pellentesque. Suspendisse varius eros quis ex mollis viverra. Cras accumsan interdum urna. Praesent sollicitudin porta tortor ac vehicula.

            Suspendisse luctus ipsum id est lobortis, in accumsan metus dignissim. Suspendisse euismod ullamcorper dui. Donec egestas, ipsum non elementum facilisis, purus nisl ornare nisi, sit amet auctor felis nisi vitae dolor. Vivamus faucibus sagittis lorem sit amet facilisis. Vestibulum ultrices vestibulum lectus. Suspendisse condimentum nec purus et molestie. Sed congue egestas nisl non laoreet. Sed eleifend commodo mi quis sagittis. Vestibulum volutpat sed urna ac aliquet.
          </Note>
        </div> */}
      </div>
      {category_id &&
        <Fab
          component={Link}
          to={`/category/${category_id}/create`}
          color="primary"
          className={classes.fab}
        >
          <Add fontSize="large" />
        </Fab>
      }
    </div>
  );
};

export default TabbedPage;