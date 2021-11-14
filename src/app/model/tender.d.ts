/* tslint:disable:max-line-length */
declare namespace Definitions {
	export interface Address {
		/**
		 * Raw string for unstructured address
		 */
		rawAddress?: string;
		/**
		 * Street including numbers
		 */
		street?: string;
		city?: string;
		state?: string;
		postcode?: string;
		/**
		 * Country Code: ISO 3166-1 alpha-2 = two letter
		 */
		country?: string;
		/**
		 * URL
		 */
		url?: string;
		/**
		 * Array of Nuts
		 */
		nuts?: (string | null)[];
		ot?: {
		/**
		 * Cleaned Nuts code
		 */
		nutscode?: string;
		};
	}
	export interface AwardCriteria {
		/**
		 * Name of criterion, PRICE if lowest price is used
		 */
		name?: string;
		/**
		 * Weight of criterion (scale 0-100)
		 */
		weight?: number;
		/**
		 * Broader description of the criterion
		 */
		description?: string;
		/**
		 * Is the criterion directly related to price (monetary measurable)? such as price, lifetime costs, interest etc.
		 */
		isPriceRelated?: boolean;
	}
	export interface Bid {
		id?: string;
		isWinning?: boolean;
		/**
		 * Is there a subcontractor?
		 */
		isSubcontracted?: boolean;
		isConsortium?: boolean;
		/**
		 * subcontractedProportion
		 */
		subcontractedProportion?: number;
		/**
		 * monthlyPriceMonthsCount
		 */
		monthlyPriceMonthsCount?: number;
		/**
		 * annualPriceYearsCount
		 */
		annualPriceYearsCount?: number;
		/**
		 * Array of Bidders
		 */
		bidders?: Bidder[];
		/**
		 * Array of Unit Price
		 */
		unitPrices?: UnitPrice[];
		payments?: Payment[];
		subcontractors?: Bidder[];
		/**
		 * Value of the tender likely to be subcontracted to third parties
		 */
		subcontractedValue?: Price;
		/**
		 * Price
		 */
		price?: Price;
	}
	export interface Bidder {
		id?: string;
		/**
		 * Name of body
		 */
		name?: string;
		/**
		 * The name of the contact person
		 */
		contactName?: string;
		/**
		 * Description of contact point - usually
		 */
		contactPoint?: string;
		/**
		 * Number of contracts where bids not empty
		 */
		contractsCount?: number;
		/**
		 * The phone number of the contact
		 */
		phone?: string;
		email?: string;
		web?: string;
		/**
		 * Address of the body seat
		 */
		address?: Address;
		company?: Company;
		dates?: Dates;
		sector?: CompanySector;
		isSme?: boolean;
		/**
		 * isSme
		 */
		isLeader?: boolean;
		/**
		 * Central, utility, regional/local, supported body (SOE's which are not utilities, research institutions,health care insurance companies, hospitals) institution under public law (prispevkove organizace), other
		 */
		buyerType?: BuyerType;
		bidderType?: string;
		/**
		 * Array of Buyer Activity Type
		 */
		mainActivities?: string[];
		metaData?: BodyMetadata;
		/**
		 * Array of Indicators
		 */
		indicators?: Indicator[];
		indicator?: indicatorObj;
	}
	export interface Body {
		id?: string;
		/**
		 * Name of body
		 */
		name?: string;
		/**
		 * The name of the contact person
		 */
		contactName?: string;
		/**
		 * Description of contact point - usually
		 */
		contactPoint?: string;
		/**
		 * The phone number of the contact
		 */
		phone?: string;
		email?: string;
		web?: string;
		/**
		 * Address of the body seat
		 */
		address?: Address;
		metaData?: BodyMetadata;
		buyerType?: BuyerType;
		bodyIds?: Array<BuyerBodyId>
	}
	export interface BodyMetadata {
		foundationDate?: string;
	}
	export interface Company {
		totalValueOfContracts: number
	}
	export interface Dates {
		awardDecisionDates: string[];
		awardDecisionYears: string[];
		awardDecisionYearsMinMax: string;
	}
	export interface CompanySector {
		cpvs: Array<string>;
		mostFrequentMarket: { key: string, label: string };
	}
	export interface Buyer {
		id?: string;
		isSme?: boolean;
		/**
		 * Name of body
		 */
		name?: string;
		/**
		 * The name of the contact person
		 */
		contactName?: string;
		/**
		 * Number of contracts where bids not empty
		 */
		contractsCount?: number;
		/**
		 * Description of contact point - usually
		 */
		contactPoint?: string;
		/**
		 * The phone number of the contact
		 */
		phone?: string;
		email?: string;
		web?: string;
		company?: Company;
		dates?: Dates;
		sector?: CompanySector;
		/**
		 * Address of the body seat
		 */
		address?: Address;
		/**
		 * Array of Buyer Activity Type
		 */
		mainActivities?: string[];
		/**
		 * Central, utility, regional/local, supported body (SOE's which are not utilities, research institutions,health care insurance companies, hospitals) institution under public law (prispevkove organizace), other
		 */
		buyerType?: BuyerType;
		/**
		 * Identifies the leader of consortium (typically buyer or bidder)
		 */
		isLeader?: boolean;
		metaData?: BodyMetadata;
		/**
		 * Array of Indicators
		 */
		indicators?: Indicator[];
		indicator?: indicatorObj;
	}
	export type BuyerType = 'NATIONAL_AUTHORITY' | 'NATIONAL_AGENCY' | 'REGIONAL_AUTHORITY' | 'REGIONAL_AGENCY' | 'PUBLIC_BODY' | 'EUROPEAN_AGENCY' | 'UTILITIES' | 'OTHER';
	export type BuyerBodyId = {
		id: string,
		type: string,
		scope: string
	}
	export interface Correction {
		/**
		 * sectionNumber
		 */
		sectionNumber?: string;
		/**
		 * lotNumber
		 */
		lotNumber?: number;
		/**
		 * placeOfModifiedText
		 */
		placeOfModifiedText?: string;
		/**
		 * original
		 */
		original?: string;
		/**
		 * replacement
		 */
		replacement?: string;
		/**
		 * originalDate
		 */
		originalDate?: string;
		/**
		 * replacementDate
		 */
		replacementDate?: string;
		/**
		 * originalCpvs
		 */
		originalCpvs?: Cpv[];
		/**
		 * replacementCpvs
		 */
		replacementCpvs?: Cpv[];
		/**
		 * originalValue
		 */
		originalValue?: {
		/**
		 * Document url
		 */
		currency?: string;
		/**
		 * netAmount
		 */
		netAmount?: number;
		};
		/**
		 * replacementValue
		 */
		replacementValue?: {
		/**
		 * Document url
		 */
		currency?: string;
		/**
		 * netAmount
		 */
		netAmount?: number;
		};
	}
	export interface Cpv {
		/**
		 * CPV code of the subject
		 */
		code?: string;
		/**
		 * Is main cpv code of the subject
		 */
		isMain?: boolean;
		/**
		 * Localized name of cpv
		 */
		name?: string;
	}
	/**
	 * Date YYYY.MM.DD
	 */
	export type Date = string; // ^\d{4}-[01]\d-[0-3]\d$
	/**
	 * Date with time YYYY.MM.DDThh:mm:ss
	 */
	export type DateTime = string; // ^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d$
	export interface Document {
		title?: string;
		language?: string;
		/**
		 * Document url
		 */
		url?: string;
		publicationDateTime?: DateTime; // ^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d$
		type?: 'CONTRACTOR_AGREEMENT';
		version?: number;
	}
	/**
	 * undocumented form-type enumeration
	 */
	export type FormType = 'CONTRACT_NOTICE' | 'CONTRACT_AWARD' | 'CONTRACT_CANCELLATION' | 'CONTRACT_IMPLEMENTATION' | 'NOTICE_ON_BUYER_PROFILE' | 'PRIOR_INFORMATION_NOTICE' | 'CONTRACT_UPDATE' | 'CONTRACT_AMENDMENT' | 'OTHER';
	export interface Funding {
		/**
		 * Refined classification of sources (such as type of Operational programme etc..)
		 */
		programme?: string;
		/**
		 * source
		 */
		source?: string;
		/**
		 * Is the source from EU funds?
		 */
		isEuFund?: boolean;
	}
	export interface Indicator {
		/**
		 * Score of indicator
		 */
		value?: IndicatorValue;
		/**
		 * Type of indicator
		 */
		type?: IndicatorType;
		status?: IndicatorStatusType;
	}
	export interface indicatorObj {
		transparencyIndicatorCompositionScore: { KE: number };
		integrityIndicatorCompositionScore: { KE: number };
		elementaryTransparencyIndicators: { KE: { tender: number } };
		elementaryIntegrityIndicators: { KE: { tender: number } };
	}
	export type IndicatorStatusType = 'CALCULATED' | 'INSUFFICIENT_DATA' | 'UNDEFINED';
	export type IndicatorType = 'INTEGRITY_SINGLE_BID' | 'INTEGRITY_CALL_FOR_TENDER_PUBLICATION' | 'INTEGRITY_ADVERTISEMENT_PERIOD' | 'INTEGRITY_PROCEDURE_TYPE' | 'INTEGRITY_DECISION_PERIOD' | 'INTEGRITY_TAX_HAVEN' | 'INTEGRITY_NEW_COMPANY' | 'ADMINISTRATIVE_CENTRALIZED_PROCUREMENT' | 'ADMINISTRATIVE_ELECTRONIC_AUCTION' | 'ADMINISTRATIVE_COVERED_BY_GPA' | 'ADMINISTRATIVE_FRAMEWORK_AGREEMENT' | 'ADMINISTRATIVE_ENGLISH_AS_FOREIGN_LANGUAGE' | 'ADMINISTRATIVE_NOTICE_AND_AWARD_DISCREPANCIES' | 'TRANSPARENCY_NUMBER_OF_KEY_MISSING_FIELDS';
	export type IndicatorValue = number;
	/**
	 * undocumented language enumeration
	 */
	export type Language = string;
	export interface Lot {
		id?: string;
		/**
		 * Tender lot title
		 */
		title?: string;
		/**
		 * Tender lot description
		 */
		description?: string;
		/**
		 * Lot number
		 */
		lotNumber?: number;
		validBidsCount?: number;
		/**
		 * Date of decision on tender award
		 */
		awardDecisionDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Estimated date of tender end. might be calculated based on stated tender duration
		 */
		estimatedCompletionDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Estimated date of tender start
		 */
		estimatedStartDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * contractSignatureDate
		 */
		contractSignatureDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * cancellationDate
		 */
		cancellationDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		committeeApprovalDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		headOfEntityApprovalDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		endorsementDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		cabinetApprovalDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		completionDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		selectionMethod?: SelectionMethod;
		/**
		 * Estimated value of tender lot
		 */
		estimatedPrice?: Price;
		/**
		 * The exact address of the tender performance
		 */
		addressOfImplementation?: Address;
		/**
		 * Estimated tender duration in months
		 */
		estimatedDurationInMonths?: number;
		/**
		 * Estimated tender duration in days
		 */
		estimatedDurationInDays?: number;
		/**
		 * Estimated tender duration in years
		 */
		estimatedDurationInYears?: number;
		/**
		 * Envisaged maximum number of participatns to the framework agreement
		 */
		maxFrameworkAgreementParticipants?: number;
		/**
		 * foreignCompaniesBidsCount
		 */
		foreignCompaniesBidsCount?: number;
		/**
		 * otherEuMemberStatesCompaniesBidsCount
		 */
		otherEuMemberStatesCompaniesBidsCount?: number;
		/**
		 * nonEuMemberStatesCompaniesBidsCount
		 */
		nonEuMemberStatesCompaniesBidsCount?: number;
		/**
		 * smeBidsCount
		 */
		smeBidsCount?: number;
		/**
		 * Array of CPV
		 */
		cpvs?: Cpv[];
		/**
		 * Array of Bid
		 */
		bids?: Bid[];
		/**
		 * Contract number
		 */
		contractNumber?: string | number;
		/**
		 * Number of bids received including electronic bids
		 */
		bidsCount?: number;
		requestedBidsCount?: number;
		/**
		 * Order on page
		 */
		positionOnPage?: number;
		/**
		 * Array of Funding
		 */
		fundings?: Funding[];
		/**
		 * MEAT criteria
		 */
		awardCriteria?: AwardCriteria[];
		eligibilityCriteria?: string;
		/**
		 * Number of bids received via electronic means
		 */
		electronicBidsCount?: number;
		/**
		 * Is lot awarded
		 */
		isAwarded?: boolean;
		/**
		 * isAwardedToGroupOfSuppliers
		 */
		isAwardedToGroupOfSuppliers?: boolean;
		/**
		 * cancellationReason
		 */
		cancellationReason?: string;
		status?: 'ANNOUNCED' | 'AWARDED' | 'CANCELLED' | 'PREPARED';
	}
	export interface Payment {
		paymentDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		price?: Price;
	}
	export interface Price {
		/**
		 * ISO 4217 of used currency
		 */
		currency?: string;
		publicationDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * ISO 4217 of used currency
		 */
		currencyNational?: string;
		/**
		 * VAT percentage (0 if no VAT is paid)
		 */
		vat?: number;
		/**
		 * Price without VAT
		 */
		netAmount?: number;
		/**
		 * Price in national currency without VAT
		 */
		netAmountNational?: number;
		/**
		 * Price in EUR without VAT
		 */
		netAmountEur?: number;
		/**
		 * Price including VAT
		 */
		amountWithVat?: number;
		/**
		 * Minimum reachable value of netAmount - typically given by range estimate or spread of bids
		 */
		minNetAmount?: number;
		/**
		 * Maximum reachable value of netAmount - typically given by range estimate or spread of bids
		 */
		maxNetAmount?: number;
		/**
		 * Minimum reachable value of amountWithVAT
		 */
		minAmountWithVat?: number;
		/**
		 * Maximum reachable value of amountWithVAT
		 */
		maxAmountWithVat?: number;
	}
	export type ProcedureType = 'OPEN' | 'RESTRICTED' | 'NEGOTIATED' | 'COMPETITIVE_DIALOG' | 'NEGOTIATED_WITH_PUBLICATION' | 'NEGOTIATED_WITHOUT_PUBLICATION' | 'DESIGN_CONTEST' | 'MINITENDER' | 'DPS_PURCHASE' | 'OUTRIGHT_AWARD' | 'APPROACHING_BIDDERS' | 'PUBLIC_CONTEST' | 'SIMPLIFIED_BELOW_THE_THRESHOLD' | 'INOVATION_PARTNERSHIP' | 'CONCESSION' | 'OTHER';
	export interface Publication {
		/**
		 * Identifier of publication on source
		 */
		sourceId?: string;
		/**
		 * source of publication
		 */
		source?: string;
		/**
		 * Url of tender on source, where human readable data are present, null if not available
		 */
		humanReadableUrl?: string;
		/**
		 * Url of tender on source, where machine readable data are present, null if not available
		 */
		machineReadableUrl?: string;
		/**
		 * Buyers custom identifier of publication
		 */
		buyerAssignedId?: string;
		/**
		 * Identifier of tender on source
		 */
		sourceTenderId?: string;
		/**
		 * Date of publication (of given version)
		 */
		publicationDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Date of dispatch (different from publication date)
		 */
		dispatchDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		lastUpdate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Language code of the publication
		 */
		language?: Language;
		/**
		 * Identifies given type of publication http://ocds.open-contracting.org/standard/r/1__0__RC/en/schema/codelists/#release-tag
		 */
		formType?: FormType;
		/**
		 * Source specific type of form
		 */
		sourceFormType?: string;
		/**
		 * Are the refered publication data already merged into this publication package?
		 */
		isIncluded?: boolean;
		/**
		 * isValid
		 */
		isValid?: boolean;
		/**
		 * isParentTender
		 */
		isParentTender?: boolean;
		version?: number;
	}
	export interface Score {
		type?: ScoreType;
		status?: IndicatorStatusType;
		/**
		 * Calculated indicator score
		 */
		value?: IndicatorValue;
	}
	/**
	 * Type of indicator score
	 */
	export type ScoreType = 'INTEGRITY' | 'ADMINISTRATIVE' | 'TRANSPARENCY' | 'TENDER';
	/**
	 * method used for bids evaluation - one of the LOWEST_PRICE or MEAT (most economically advantageous tender), individual MEAT criteria are in awardCriteria
	 */
	export type SelectionMethod = 'MEAT' | 'LOWEST_PRICE';
	export type SizeType = 'BELOW_THE_THRESHOLD' | 'ABOVE_THE_THRESHOLD';
	export type SupplyType = 'SUPPLIES' | 'WORKS' | 'SERVICES' | 'OTHER';
	export interface Tender {
		supplierName: string;
		supplierAddress: string;
		supplierId: string;
		supplierBidderType: string;
		/**
		 * Tender ID
		 */
		id: string;
		/**
		 * Country of tender
		 */
		country?: string;
		/**
		 * DB entry create date-time with ms
		 */
		created?: string;
		/**
		 * DB entry modified date-time with ms
		 */
		modified?: string;
		/**
		 * Type of procedure - unstructured
		 */
		nationalProcedureType?: string;
		originalSupplyType?: string;
		/**
		 * Reference number given to tender by buyer
		 */
		buyerAssignedId?: string;
		/**
		 * Tender title
		 */
		title?: string;
		/**
		 * Tender title English
		 */
		titleEnglish?: string;
		/**
		 * Subject description
		 */
		description?: string;
		/**
		 * Name of body to which appeals should be filed
		 */
		appealBodyName?: string;
		/**
		 * Name of body to which appeals should be filed
		 */
		mediationBodyName?: string;
		/**
		 * excessiveFrameworkAgreementJustification
		 */
		excessiveFrameworkAgreementJustification?: string;
		/**
		 * acceleratedProcedureJustification
		 */
		acceleratedProcedureJustification?: string;
		/**
		 * Description of deposits required (ideally number and currency, decomposed to price)
		 */
		deposits?: string;
		/**
		 * Description of personal requirements on bidder
		 */
		personalRequirements?: string;
		/**
		 * Description of economic requirements on bidder
		 */
		economicRequirements?: string;
		/**
		 * Description of technical requirements on bidder
		 */
		technicalRequirements?: string;
		/**
		 * cancellationReason
		 */
		cancellationReason?: string;
		/**
		 * modificationReason
		 */
		modificationReason?: string;
		/**
		 * modificationReasonDescription
		 */
		modificationReasonDescription?: string;
		procedureType?: ProcedureType;
		size?: SizeType;
		supplyType?: SupplyType;
		selectionMethod?: SelectionMethod;
		/**
		 * Electronic invoicing will be accepted
		 */
		isEInvoiceAccepted?: boolean;
		/**
		 * Is tender awarded by central purchasing authority?
		 */
		isCentralProcurement?: boolean;
		/**
		 * Is covered by GPA?
		 */
		isCoveredByGpa?: boolean;
		/**
		 * Is there a price asked for tender documents provision?
		 */
		documentsPayable?: boolean;
		/**
		 * The tender involves joint procurement
		 */
		isJointProcurement?: boolean;
		/**
		 * Is awarded as superior framework agreement?
		 */
		isFrameworkAgreement?: boolean;
		/**
		 * Is accelerated procedure
		 */
		isAcceleratedProcedure?: boolean;
		/**
		 * Is whole tender cancelled
		 */
		isWholeTenderCancelled?: boolean;
		/**
		 * Is either initiation of dynamic purchasing system, or a purchase via one
		 */
		isDps?: boolean;
		/**
		 * Is awarded by eauction?
		 */
		isElectronicAuction?: boolean;
		/**
		 * Is the tender divided into lots?
		 */
		hasLots?: boolean;
		/**
		 * Are variant offers accepted?
		 */
		areVariantsAccepted?: boolean;
		isDocumentsAccessRestricted?: boolean;
		/**
		 * Tender has options?
		 */
		hasOptions?: boolean;
		/**
		 * Boolean whether the purchase is being made for someone else. e.g. city purchases on behalf of one of its schools...
		 */
		isOnBehalfOf?: boolean;
		/**
		 * Estimated date of tender start
		 */
		estimatedStartDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Date of tender cancellation (or its publication)
		 */
		cancellationDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Estimated date of tender end. Might be calculated based on stated tender duration
		 */
		estimatedCompletionDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Until when is tender to be awarded by latest? (how long are bidders bound by their bids)
		 */
		awardDeadline?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Date until which bids need to be submitted (do not confuse with application deadline for Restricted procedure type)
		 */
		bidDeadline?: DateTime; // ^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d$
		/**
		 * Date until tender documents or additional information are provided
		 */
		documentsDeadline?: DateTime; // ^\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d$
		/**
		 * Date of decision on tender award
		 */
		awardDecisionDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		contractSignatureDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		completionDate?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		year?: string;
		/**
		 * Estimated tender duration in months
		 */
		estimatedDurationInMonths?: number;
		/**
		 * Estimated tender duration in days
		 */
		estimatedDurationInDays?: number;
		/**
		 * Estimated tender duration in years
		 */
		estimatedDurationInYears?: number;
		/**
		 * awardDeadlineDuration
		 */
		awardDeadlineDuration?: number;
		/**
		 * Envisaged maximum number of participants to the framework agreement
		 */
		maxFrameworkAgreementParticipants?: number;
		/**
		 * Maximum number of bids, typically used in Restricted or Negotiated with publication procedure
		 */
		maxBidsCount?: number;
		envisagedMinCandidatesCount?: number;
		envisagedMaxCandidatesCount?: number;
		envisagedCandidatesCount?: number;
		/**
		 * Price of tender documents
		 */
		documentsPrice?: Price;
		/**
		 * Estimated value of tender lot
		 */
		estimatedPrice?: Price;
		finalPrice?: Price;
		/**
		 * Body from whom further information can be obtained
		 */
		furtherInformationProvider?: Buyer;
		/**
		 * Body from whom specifications and additional documents can be obtained
		 */
		specificationsProvider?: Buyer;
		/**
		 * Body to whom tenders/requests to participate must be sent
		 */
		bidsRecipient?: Buyer;
		/**
		 * The exact address of the tender performance
		 */
		addressOfImplementation?: Address;
		/**
		 * Array of Funding
		 */
		fundings?: Funding[];
		/**
		 * Array of Indicators
		 */
		indicators?: Indicator[];
		/**
		 * If the purchase is being made for someone else. e.g. city purchases on behalf of one of its schools...
		 */
		onBehalfOf?: Buyer[];
		/**
		 * Array of Buyer
		 */
		buyers?: Buyer[];
		/**
		 * Array of Body
		 */
		administrators?: Buyer[];
		/**
		 * Array of Lot
		 */
		lots?: Lot[];
		/**
		 * Array of CPV codes of the subject
		 */
		cpvs?: Cpv[];
		/**
		 * MEAT criteria
		 */
		awardCriteria?: AwardCriteria[];
		eligibilityCriteria?: string;
		/**
		 * Array of Languages in which tenders or requests to participate may be submitted
		 */
		eligibleBidLanguages?: string[];
		/**
		 * Reasons for use of negotiated procedure without publication, such as: no bids, research, technical, artistic, legal, urgency,additional work, work repetition,design contest,commodity market
		 */
		npwpReasons?: string[];
		/**
		 * Array of relevant publications, including url info for original CFT, CA...
		 */
		publications?: Publication[];
		/**
		 * Array of documents relevant to tender (tender documentation, protocol on bids evaluation etc)
		 */
		documents?: Document[];
		/**
		 * corrections
		 */
		corrections?: Correction[];
		documentsLocation?: Address;
		ot?: {
		indicator?: {
			INTEGRITY_SINGLE_BID?: IndicatorValue;
			INTEGRITY_CALL_FOR_TENDER_PUBLICATION?: IndicatorValue;
			INTEGRITY_ADVERTISEMENT_PERIOD?: IndicatorValue;
			INTEGRITY_PROCEDURE_TYPE?: IndicatorValue;
			INTEGRITY_DECISION_PERIOD?: IndicatorValue;
			INTEGRITY_TAX_HAVEN?: IndicatorValue;
			INTEGRITY_NEW_COMPANY?: IndicatorValue;
			ADMINISTRATIVE_CENTRALIZED_PROCUREMENT?: IndicatorValue;
			ADMINISTRATIVE_ELECTRONIC_AUCTION?: IndicatorValue;
			ADMINISTRATIVE_COVERED_BY_GPA?: IndicatorValue;
			ADMINISTRATIVE_FRAMEWORK_AGREEMENT?: IndicatorValue;
			ADMINISTRATIVE_ENGLISH_AS_FOREIGN_LANGUAGE?: IndicatorValue;
			ADMINISTRATIVE_NOTICE_AND_AWARD_DISCREPANCIES?: IndicatorValue;
			TRANSPARENCY_NUMBER_OF_KEY_MISSING_FIELDS?: IndicatorValue;
		};
		score?: {
			INTEGRITY?: IndicatorValue;
			ADMINISTRATIVE?: IndicatorValue;
			TRANSPARENCY?: IndicatorValue;
			TENDER?: IndicatorValue;
		};
		cpv?: string;
		/**
		 * Array of Indicator Scores
		 */
		scores?: Score[];
		/**
		 * Unified Tender Date
		 */
		date?: Date; // ^\d{4}-[01]\d-[0-3]\d$
		/**
		 * Country Code: ISO 3166-1 alpha-2 = two letter OR ('EU' == European Institutions)
		 */
		country?: string;
		};
	}
	export interface UnitPrice {
		/**
		 * Number of units
		 */
		unitNumber?: number;
		/**
		 * currency
		 */
		currency?: string;
	}
}
