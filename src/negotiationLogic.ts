interface NegotiationState {
  currentOffer: number;
  negotiationCount: number;
  clientBudget?: number;
  isClosed: boolean;
  ongoingService?: boolean;
}

const INITIAL_OFFER = 10000;
const MINIMUM_OFFER = 5000;
const MAINTENANCE_FEE = 2000;
const LOYALTY_DISCOUNT = 1500;

const PACKAGE_DETAILS = `
Our full-service AI agency package includes:
• AI callers for outreach and appointment booking
• Done-for-you ad campaigns
• Automated lead generation systems
• AI messaging and follow-up agents
• AI chatbots for customer service and pre-sale
`;

export class NegotiationLogic {
  private state: NegotiationState;

  constructor() {
    this.state = {
      currentOffer: INITIAL_OFFER,
      negotiationCount: 0,
      isClosed: false
    };
  }

  getCurrentOffer(): number {
    return this.state.currentOffer;
  }

  getPackageDetails(): string {
    return PACKAGE_DETAILS;
  }

  handleClientResponse(response: string): string {
    if (this.state.isClosed) {
      return "This negotiation has been concluded. Let us know if you'd like to discuss further!";
    }

    const lowerCaseResponse = response.toLowerCase();

    if (lowerCaseResponse.includes('what\'s included') || 
        lowerCaseResponse.includes('package details')) {
      return PACKAGE_DETAILS;
    }

    if (lowerCaseResponse.includes('can\'t afford') || 
        lowerCaseResponse.includes('no budget') ||
        lowerCaseResponse.includes('too expensive')) {
      return this.handleBudgetConcern();
    }

    if (lowerCaseResponse.includes('yes') || 
        lowerCaseResponse.includes('agree') ||
        lowerCaseResponse.includes('accept')) {
      return this.handleAcceptance();
    }

    if (lowerCaseResponse.includes('no') || 
        lowerCaseResponse.includes('decline')) {
      return this.handleDecline();
    }

    return "I understand. Let me know if you have any specific questions about our services or pricing.";
  }

  private handleBudgetConcern(): string {
    if (this.state.currentOffer <= MINIMUM_OFFER) {
      this.state.isClosed = true;
      return `Unfortunately, we can't offer this package below $${MINIMUM_OFFER} as it wouldn't be sustainable to deliver the full service at that level. The value we provide is worth far more than the cost.`;
    }

    this.state.negotiationCount++;
    const newOffer = Math.max(MINIMUM_OFFER, this.state.currentOffer - 1000);
    this.state.currentOffer = newOffer;

    return `I understand budget concerns. Let me offer you a special rate of $${newOffer} for our comprehensive AI agency package. This includes all the services I mentioned earlier and provides exceptional value for your business.`;
  }

  private handleAcceptance(): string {
    this.state.isClosed = true;
    let response = `Great! We're excited to work with you at $${this.state.currentOffer}. `;
    
    response += `Would you like to add our ongoing maintenance and optimization service for $${MAINTENANCE_FEE}/month? This ensures your AI systems stay up-to-date and perform at their best.`;

    return response;
  }

  private handleDecline(): string {
    this.state.isClosed = true;
    return "No problem at all. You can always add our services later if needed. Let us know if there's anything else we can assist you with!";
  }

  handleMaintenanceResponse(response: string): string {
    if (!this.state.isClosed) {
      return "Let's finalize the main package first, then we can discuss ongoing services.";
    }

    const lowerCaseResponse = response.toLowerCase();

    if (lowerCaseResponse.includes('yes') || 
        lowerCaseResponse.includes('agree')) {
      this.state.ongoingService = true;
      return `Excellent! We'll include the ongoing maintenance service for $${MAINTENANCE_FEE}/month.`;
    }

    if (lowerCaseResponse.includes('too expensive') || 
        lowerCaseResponse.includes('lower')) {
      return `I understand. As a loyalty discount, we can offer the maintenance service for $${LOYALTY_DISCOUNT}/month. Would that work for you?`;
    }

    if (lowerCaseResponse.includes('no') || 
        lowerCaseResponse.includes('decline')) {
      this.state.ongoingService = false;
      return "No problem! You can always add this service later if needed. We're excited to get started on your AI solutions!";
    }

    return "Let me know if you have any questions about our ongoing maintenance service.";
  }
}
