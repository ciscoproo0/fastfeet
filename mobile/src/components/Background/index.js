import LinearGradient from 'react-native-linear-gradient';
import styled from 'styled-components/native';

export default styled(LinearGradient).attrs({
  start: { x: 0, y: 0 },
  locations: [1, 1],
  end: { x: 0, y: 0.3 },
  colors: ['#7d40e7', '#fff'],
})`
  flex: 1;
`;
