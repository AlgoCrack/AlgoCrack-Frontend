import { render, RenderResult } from '@testing-library/react';
import HomePage from '@/app/page';

describe('pages > index.tsx', () => {
  const renderHomePage = (): RenderResult => {
    return render(<HomePage />);
  };

  it('should be able to render the HomePage page', () => {
    const { getByText } = renderHomePage();
    expect(
      getByText('Learn about Next.js in an interactive course with quizzes!')
    ).toBeInTheDocument();
  });
});
