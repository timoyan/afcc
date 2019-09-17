jest.mock('react-dom', () => ({
    createPortal: node => node
}));

export {};
